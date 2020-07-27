import {NowRequest, NowResponse} from '@vercel/node'
const publicBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.pcwa.net'

function testRe(filename: string, testParam: string | string[]) {
  testParam = Array.isArray(testParam) ? testParam[0] : testParam
  const regex = new RegExp(`^${filename}(.[a-z]{1,4})?$`, 'i') //  4 letter file extension is optional.
  return regex.test(testParam)
}

const REDIRECT_STATUS_CODE = 307
const NOT_FOUND_ROUTE = `${publicBaseUrl}/404`

// cspell:ignore CWMP
const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')
    const {id, sub} = req.query
    if (!sub) {
      switch (true) {
        /*  These doc links are used with "Grand Jury 2015 Report - Responses to Recommendations v3.docx" and generated pdf for Tony Firenzi which was distributed to Board of Directors and made available to the public 11/11/2020. */
        case testRe('CWMP-Implementation-Plan', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/b6eda2f0-f767-11e9-9b34-e182dcef54b2-CWMP-Implementation-Plan-10252019.pdf'
            })
            .end()
          break
        case testRe('Financial-Assistance-Program-Policy', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/b06c23c0-f767-11e9-9b34-e182dcef54b2-Financial-Assistance-Program-Policy-Final-9.19.19.pdf'
            })
            .end()
          break
        case testRe('2020-Adopted-Budget', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/18facc90-f527-11e9-838f-39811b395d2d-2020-PCWA-Adopted-Budget-Final-for-website.pdf'
            })
            .end()
          break
        case testRe('2019-Comprehensive-Annual-Financial-Report', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/51cc8ec0-a1be-11ea-acbc-47da0ebc2584-2019-PCWA-CAFR-Final-for-Website.pdf'
            })
            .end()
          break
        case testRe('2018-Comprehensive-Annual-Financial-Report', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/52fe04d0-7b50-11e9-ae74-33a275ef3c9b-2018-PCWA-CAFR-Final-for-Web.pdf'
            })
            .end()
          break
        case testRe('Resolution-08-16', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/c35d42c0-4c5d-11ea-ab88-7b2f955dad17-Resolution-08-16.pdf'
            })
            .end()
          break
        case testRe('Resolution-19-24', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/c73af220-4c5d-11ea-ab88-7b2f955dad17-Resolution-19-24.pdf'
            })
            .end()
          break
        /* */
        /*  This doc link was used with COVID-19 eNews Blast for R. Branch, which was distributed via Mailchimp 3/19/2020. */
        case testRe('COVID-19-faqs', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/7bfe5c30-6a1b-11ea-903a-2bfc7dd2c6f9-COVID-19-FAQs.pdf'
            })
            .end()
          break
        /* */

        // Now lambdas cannot exceed 6mb limit so piping response isn't going to work for many assets. This example does work.
        // case 'baz':
        //   {
        //     const response = await fetch(
        //       'https://cdn.cosmicjs.com/f4d68990-f520-11e9-ae6a-3f483301f6c2-10-22-2019PCWABoardAdopts2020Budget.pdf'
        //     )
        //     response.body?.pipe(res)
        //   }
        //   break

        case testRe('hr-frequently-asked-questions', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/9eb06730-ac30-11ea-8daf-c3880e5e9d72-CandidateFrequentlyAskedQuestions.pdf'
            })
            .end()
          break

        // Vendor Application link is used in Vendor Letter PDF. Chris Bonnenfant has more info on use of this link and how Vendor Letter is distributed.
        case testRe('vendorapp', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/6a72fa30-acf0-11ea-8dee-d7617d15f3b4-VendorApplication.pdf'
            })
            .end()
          break

        default:
          // res.setHeader('Content-Type', 'text/html')
          // res.status(404).send('Page Not Found')
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location: NOT_FOUND_ROUTE
            })
            .end()
          break
      }
    } else if (paramToLowerStr(sub).toLowerCase() === 'ccr') {
      /*  These doc links are used and distributed via mail to all treated customers. */
      switch (true) {
        case testRe('alta', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/b9e6f0c0-75e2-11ea-8418-4938ccc0888b-Alta2020.pdf'
            })
            .end()
          break
        case testRe('foothill-sunset', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/baea7e10-75e2-11ea-8418-4938ccc0888b-Foothill-Sunset2020.pdf'
            })
            .end()
          break
        case testRe('monte-vista', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/b92b9000-75e2-11ea-8418-4938ccc0888b-MonteVista2020.pdf'
            })
            .end()
          break
        case testRe('applegate', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/b9af8d10-75e2-11ea-8418-4938ccc0888b-Applegate2020.pdf'
            })
            .end()
          break
        case testRe('auburn-bowman', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/b902ab40-75e2-11ea-8418-4938ccc0888b-Auburn-Bowman2020.pdf'
            })
            .end()
          break
        case testRe('bianchi', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/b9f26270-75e2-11ea-8418-4938ccc0888b-Bianchi2020.pdf'
            })
            .end()
          break
        case testRe('colfax', id):
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location:
                'https://cdn.cosmicjs.com/b9bbe920-75e2-11ea-8418-4938ccc0888b-Colfax2020.pdf'
            })
            .end()
          break
        /* */
        default:
          // res.setHeader('Content-Type', 'text/html')
          // res.status(404).send('Page Not Found')
          res
            .writeHead(REDIRECT_STATUS_CODE, {
              Location: NOT_FOUND_ROUTE
            })
            .end()
          break
      }
    } else {
      // If sub parameter was bogus just 404
      res
        .writeHead(REDIRECT_STATUS_CODE, {
          Location: NOT_FOUND_ROUTE
        })
        .end()
    }
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler

function paramToLowerStr(param?: string | string[]): string {
  if (Array.isArray(param)) {
    param = param.join(',').toLowerCase()
  }
  return param || '' // Don't use ?? here since it is not supported by Vercel lambda
}
