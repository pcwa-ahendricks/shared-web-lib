import json
from io import BytesIO
from pathlib import Path
import requests
from dotenv import load_dotenv
import pdfplumber
import pytesseract
from pdf2image import convert_from_bytes
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

# Load environment variables from a .env file
load_dotenv(".env.development.local")

download_directory = Path.cwd() / "src" / "lib" / "txt" / "media" / "ophir-project"

# Ensure the download directory exists
download_directory.mkdir(parents=True, exist_ok=True)


def embed_text_in_pdf(input_pdf_data, output_pdf_path, tesseract_cmd="tesseract"):
    """
    Embeds text in a PDF file using OCR and saves the modified PDF.

    Args:
        input_pdf_data (bytes): PDF file data.
        output_pdf_path (Path): Path to the output PDF file.
        tesseract_cmd (str): Path to the Tesseract executable.
    """
    # Set the tesseract command path
    pytesseract.pytesseract.tesseract_cmd = tesseract_cmd

    output_pdf_path_str = output_pdf_path.as_posix()

    # Convert PDF to images
    pages = convert_from_bytes(input_pdf_data)

    # Create a canvas for the new PDF
    c = canvas.Canvas(output_pdf_path_str, pagesize=letter)

    for page_number, page in enumerate(pages):
        # OCR the image to extract text
        text = pytesseract.image_to_string(page)

        # Draw the image
        temp_image_path = Path("temp_pdf_page.jpg")
        page.save(temp_image_path, "JPEG")
        c.drawImage(temp_image_path, 0, 0, width=letter[0], height=letter[1])

        # Draw the extracted text (invisible but selectable)
        c.setFont("Helvetica", 10)
        text_lines = text.split("\n")
        for i, line in enumerate(text_lines):
            c.drawString(10, letter[1] - 10 - (12 * i), line)

        # Add a new page
        if page_number < len(pages) - 1:
            c.showPage()

    c.save()

    # Delete the temporary image file
    temp_image_path.unlink()


def fetch_and_parse_pdfs():
    """
    Fetches PDF files from CosmicJS, extracts text using pdfplumber, conditionally performs OCR with Tesseract if no text
    is extracted on first pass, and saves the text content to local text files.
    """
    try:
        # Prepare the URL encoded query
        query = {
            "folder": "mfpfa-agendas",
            # uncomment the following in order to debug, and download/process a single pdf
            # "name": "f9a0c480-c657-11ec-bf80-e74645a81647-02-15-2007MFPFA-Agenda.pdf",
        }

        cosmic_response = requests.get(
            f"https://api.cosmicjs.com/v3/buckets/{COSMIC_BUCKET_SLUG}/media",
            params={
                "read_key": COSMIC_READ_ACCESS_KEY,
                "props": "url,original_name",
                "query": json.dumps(query),
            },
            timeout=60,
        )
        cosmic_response.raise_for_status()
        media_files = cosmic_response.json().get("media", [])

        for file in media_files:
            try:
                url = file["url"]
                original_name = file["original_name"]
                pdf_response = requests.get(url, timeout=120)
                pdf_response.raise_for_status()

                pdf_data = pdf_response.content
                if pdf_data:
                    try:
                        with pdfplumber.open(BytesIO(pdf_data)) as pdf:
                            # All pages
                            # text = "".join(
                            #     [
                            #         page.extract_text()
                            #         for page in pdf.pages
                            #         if page.extract_text()
                            #     ]
                            # )
                            # First 15 pages only. Need to reduce the file size of the text files that are being loaded into Nextjs.
                            # 15 pages seems like a good number after reviewing the content of some of the larger pdfs.
                            # In most cases this reduces the filesize of the resulting text file drastically.
                            text = ""
                            for i, page in enumerate(pdf.pages):
                                if i >= 15:
                                    break
                                text += page.extract_text() + "\n"

                            # If pdfplumber fails to extract text, use OCR and embed text
                            if not text.strip():
                                ocr_output_pdf_path = Path(
                                    Path(original_name).stem + "_ocr.pdf"
                                )

                                embed_text_in_pdf(pdf_data, ocr_output_pdf_path)

                                # Extract text from the newly generated PDF (second pass)
                                with pdfplumber.open(ocr_output_pdf_path) as ocr_pdf:
                                    # All pages
                                    # text = "".join(
                                    #     [
                                    #         page.extract_text()
                                    #         for page in ocr_pdf.pages
                                    #         if page.extract_text()
                                    #     ]
                                    # )
                                    # First 15 pages
                                    text = ""
                                    for i, ocr_page in enumerate(ocr_pdf.pages):
                                        if i >= 15:
                                            break
                                        text += ocr_page.extract_text() + "\n"

                                # Delete the ocr version of the pdf file
                                ocr_output_pdf_path.unlink()

                            # Replace the extension using with_suffix
                            text_filename = Path(original_name).with_suffix(".txt")

                            # Set output path
                            path_to_file = download_directory / text_filename

                            # Write the text content to a file
                            path_to_file.write_text(text, encoding="utf-8")

                            print(
                                f"Text extracted from {url} and saved to {text_filename.name}"
                            )
                    except Exception as e:
                        print("Error parsing the PDF:", e)
            except requests.exceptions.RequestException as e:
                print(f"Failed to fetch PDF: {pdf_response.status_code}", e)
    except requests.exceptions.RequestException as e:
        print(
            f"Error fetching media from Cosmic: {cosmic_response.status_code}",
            e,
        )


if __name__ == "__main__":
    fetch_and_parse_pdfs()


class PDFDownloadError(Exception):
    """Custom exception for PDF download errors."""

    pass
