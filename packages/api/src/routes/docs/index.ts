import {NowRequest, NowResponse} from '@now/node'
// import fetch from 'node-fetch'

function testRe(filename: string, testParam: string | string[]) {
  testParam = Array.isArray(testParam) ? testParam[0] : testParam
  const regex = new RegExp(`^${filename}(.[a-z]{1,4})?$`, 'i') //  4 letter file extension is optional.
  return regex.test(testParam)
}

const REDIRECT_STATUS_CODE = 302

// cspell:ignore CWMP
const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const {id} = req.query
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

      default:
        res.setHeader('Content-Type', 'text/html')
        res.status(404).send('Page Not Found')
        break
    }
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
