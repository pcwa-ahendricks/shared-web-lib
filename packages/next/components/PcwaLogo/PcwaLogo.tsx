import React from 'react'

/**
 * Then Angular version of this component used a 'max-width' and 'max-height' property on <Svg/>, but that results in a runtime error. Style property is used instead. See https://stackoverflow.com/questions/29615607/react-svg-max-width for more info.
 */

type Props = {
  missionStatementFill?: string
  logoRightFill?: string
  brandFill?: string
  logoLeftFill?: string
} & React.SVGProps<SVGSVGElement>

const PcwaLogo = ({
  brandFill = '#12456E',
  missionStatementFill = '#72B549',
  logoLeftFill = '#12456E',
  logoRightFill = '#72B549',
  preserveAspectRatio = 'xMinYMid meet',
  ...rest
}: Props) => {
  return (
    <React.Fragment>
      {/* <?xml version="1.0" encoding="UTF-8" standalone="no"?>  */}
      <svg
        viewBox="0 0 586 157"
        preserveAspectRatio={preserveAspectRatio}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...rest}
      >
        {/* Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch */}
        {/* <title>Logo</title> */}
        <desc>Created with Sketch.</desc>
        <defs />
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Logo"
            transform="translate(292.000000, 88.100000) scale(1, -1) translate(-292.000000, -88.100000) translate(-13.500000, -18.900000)"
          >
            <g id="Text" transform="translate(0.000000, -0.000000)">
              <g
                id="Mission-Statement"
                transform="translate(150.000000, 38.000000)"
                fill={missionStatementFill}
              >
                <path
                  d="M3.136,12.584 L7.232,12.584 L8.784,8.168 L8.816,8.168 L10.368,12.584 L14.464,12.584 L17.6,4.424 L14.24,4.424 L12.384,10.376 L12.352,10.376 L10.208,4.424 L7.392,4.424 L5.248,10.376 L5.216,10.376 L3.36,4.424 L0,4.424 L3.136,12.584 Z M23.1899998,10.392 C23.1899998,12.312 24.3899998,12.728 26.2619998,12.712 L28.3579998,12.712 C29.8939998,12.712 30.2139998,12.536 31.0619998,11.656 L31.0619998,12.584 L33.9739998,12.584 L33.9739998,7.224 C33.9739998,5.304 32.8539998,4.296 30.7419998,4.296 L27.1739998,4.296 C24.5819998,4.296 23.4939998,4.664 23.4939998,6.872 L26.4699998,6.872 C26.5019998,6.296 26.7579998,6.216 27.6539998,6.216 L29.4619998,6.216 C30.6619998,6.216 30.9019998,6.504 30.9019998,7.304 L30.9019998,8.024 C30.3099998,7.416 29.3819998,7.368 27.7019998,7.368 C24.7259998,7.368 23.1899998,7.496 23.1899998,9.72 L23.1899998,10.392 Z M27.7819998,10.792 C26.5819998,10.792 26.1659998,10.584 26.1659998,10.056 C26.1659998,9.384 26.4379998,9.096 27.7339998,9.096 L29.0939998,9.096 C30.7899998,9.096 30.9659998,9.32 30.9659998,9.928 C30.9659998,10.472 30.7739998,10.792 28.6619998,10.792 L27.7819998,10.792 Z M41.6279996,9.864 C41.6279996,12.12 43.2599996,12.712 45.1479996,12.712 L46.3639996,12.712 C48.8119996,12.712 49.8359996,11.528 49.8359996,9.976 L49.8359996,8.984 L47.1479996,8.984 L47.1479996,9.528 C47.1479996,10.28 46.8759996,10.504 45.8839996,10.504 C45.1479996,10.504 44.6999996,10.376 44.6999996,9.768 L44.6999996,6.632 L49.4679996,6.632 L49.4679996,4.424 L44.6999996,4.424 L44.6999996,2.504 L41.6279996,2.504 L41.6279996,4.424 L40.0919996,4.424 L40.0919996,6.632 L41.6279996,6.632 L41.6279996,9.864 Z M56.1299994,8.84 C56.1299994,12.328 58.2739994,12.712 60.3059994,12.712 L62.6099994,12.712 C64.8339994,12.712 66.6579994,12.264 66.6579994,10.216 L66.6579994,9.864 L63.7779994,9.864 C63.7779994,10.344 63.6979994,10.792 62.0339994,10.792 L61.0899994,10.792 C59.8099994,10.792 59.2019994,10.552 59.2019994,9.688 L59.2019994,9.192 L66.6579994,9.192 L66.6579994,7.816 C66.6579994,4.984 65.3139994,4.296 62.0499994,4.296 L59.9059994,4.296 C57.6659994,4.296 56.1299994,4.968 56.1299994,8.056 L56.1299994,8.84 Z M59.2019994,7.368 C59.2019994,6.392 59.4419994,6.216 61.4419994,6.216 C63.2339994,6.216 63.6819994,6.392 63.6819994,7.368 L59.2019994,7.368 Z M73.3359992,12.584 L76.4079992,12.584 L76.4079992,8.072 C76.4079992,7.096 77.1439992,6.696 78.1999992,6.696 C79.4319992,6.696 79.6719992,7.192 79.6719992,8.232 L82.3279992,8.232 C82.3439992,7.944 82.3599992,7.72 82.3599992,7.512 C82.3599992,5.256 81.4799992,4.296 79.2399992,4.296 C77.8479992,4.296 76.5999992,4.68 76.2479992,5.976 L76.2159992,5.976 L76.2159992,4.424 L73.3359992,4.424 L73.3359992,12.584 Z M101.859999,6.792 C101.859999,8.392 103.155999,9.688 104.755999,9.688 C106.355999,9.688 107.651999,8.392 107.651999,6.792 C107.651999,5.192 106.355999,3.896 104.755999,3.896 C103.155999,3.896 101.859999,5.192 101.859999,6.792 L101.859999,6.792 Z M127.231998,8.84 C127.231998,12.328 129.375998,12.712 131.407998,12.712 L133.711998,12.712 C135.935998,12.712 137.759998,12.264 137.759998,10.216 L137.759998,9.864 L134.879998,9.864 C134.879998,10.344 134.799998,10.792 133.135998,10.792 L132.191998,10.792 C130.911998,10.792 130.303998,10.552 130.303998,9.688 L130.303998,9.192 L137.759998,9.192 L137.759998,7.816 C137.759998,4.984 136.415998,4.296 133.151998,4.296 L131.007998,4.296 C128.767998,4.296 127.231998,4.968 127.231998,8.056 L127.231998,8.84 Z M130.303998,7.368 C130.303998,6.392 130.543998,6.216 132.543998,6.216 C134.335998,6.216 134.783998,6.392 134.783998,7.368 L130.303998,7.368 Z M144.437998,12.584 L147.509998,12.584 L147.509998,8.472 C147.509998,7.304 148.293998,6.696 149.605998,6.696 L150.309998,6.696 C151.653998,6.696 152.293998,7.096 152.293998,7.896 L152.293998,12.584 L155.365998,12.584 L155.365998,7.896 C155.365998,4.376 152.709998,4.296 150.805998,4.296 C149.157998,4.296 148.085998,4.6 147.541998,5.736 L147.509998,5.736 L147.509998,4.424 L144.437998,4.424 L144.437998,12.584 Z M162.043998,8.84 C162.043998,12.328 164.187998,12.712 166.219998,12.712 L168.523998,12.712 C170.747998,12.712 172.571998,12.264 172.571998,10.216 L172.571998,9.864 L169.691998,9.864 C169.691998,10.344 169.611998,10.792 167.947998,10.792 L167.003998,10.792 C165.723998,10.792 165.115998,10.552 165.115998,9.688 L165.115998,9.192 L172.571998,9.192 L172.571998,7.816 C172.571998,4.984 171.227998,4.296 167.963998,4.296 L165.819998,4.296 C163.579998,4.296 162.043998,4.968 162.043998,8.056 L162.043998,8.84 Z M165.115998,7.368 C165.115998,6.392 165.355998,6.216 167.355998,6.216 C169.147998,6.216 169.595998,6.392 169.595998,7.368 L165.115998,7.368 Z M179.249998,12.584 L182.321998,12.584 L182.321998,8.072 C182.321998,7.096 183.057998,6.696 184.113998,6.696 C185.345998,6.696 185.585998,7.192 185.585998,8.232 L188.241998,8.232 C188.257998,7.944 188.273998,7.72 188.273998,7.512 C188.273998,5.256 187.393998,4.296 185.153998,4.296 C183.761998,4.296 182.513998,4.68 182.161998,5.976 L182.129998,5.976 L182.129998,4.424 L179.249998,4.424 L179.249998,12.584 Z M194.663998,8.616 C194.663998,10.824 195.575998,12.008 198.551998,12.008 L200.167998,12.008 C201.799998,12.008 202.311998,11.768 202.919998,11.16 L202.919998,11.704 C202.919998,13.08 202.263998,13.512 200.919998,13.512 L198.695998,13.512 C198.199998,13.512 197.943998,13.272 197.943998,12.888 L194.775998,12.888 C194.775998,14.936 195.943998,15.432 198.007998,15.432 L201.399998,15.432 C205.255998,15.432 205.799998,13.768 205.799998,12.072 L205.799998,4.424 L202.919998,4.424 L202.919998,5.544 L202.887998,5.544 C202.119998,4.488 201.751998,4.296 200.199998,4.296 L198.407998,4.296 C195.959998,4.296 194.663998,4.968 194.663998,7.496 L194.663998,8.616 Z M199.511998,9.8 C197.991998,9.8 197.639998,9.4 197.639998,8.168 C197.639998,6.92 197.991998,6.504 199.511998,6.504 L201.015998,6.504 C202.535998,6.504 202.887998,6.92 202.887998,8.168 C202.887998,9.4 202.535998,9.8 201.015998,9.8 L199.511998,9.8 Z M214.429998,15.368 C214.733998,15.384 215.101998,15.432 215.677998,15.432 C217.229998,15.432 218.157998,15.08 218.637998,14.088 L223.213998,4.424 L219.885998,4.424 L217.533998,10.104 L215.181998,4.424 L211.853998,4.424 L215.597998,12.232 L216.685998,12.232 C216.685998,13.176 215.901998,13.416 214.685998,13.416 L214.429998,13.416 L214.429998,15.368 Z M242.169997,6.792 C242.169997,8.392 243.465997,9.688 245.065997,9.688 C246.665997,9.688 247.961997,8.392 247.961997,6.792 C247.961997,5.192 246.665997,3.896 245.065997,3.896 C243.465997,3.896 242.169997,5.192 242.169997,6.792 L242.169997,6.792 Z M267.621997,10.04 C267.621997,12.056 268.661997,12.712 271.493997,12.712 L274.405997,12.712 C277.909997,12.712 278.773997,12.152 278.773997,9.992 C278.773997,8.536 278.501997,7.304 274.821997,7.304 L272.693997,7.304 C271.093997,7.304 270.853997,7.176 270.853997,6.824 C270.853997,6.264 271.189997,6.216 272.965997,6.216 C274.805997,6.216 275.093997,6.296 275.253997,6.776 L278.325997,6.776 C278.293997,4.856 277.589997,4.296 273.573997,4.296 L271.429997,4.296 C269.317997,4.296 267.685997,4.6 267.685997,6.632 C267.685997,8.872 268.533997,9.496 271.397997,9.512 L274.277997,9.512 C275.365997,9.512 275.605997,9.704 275.605997,10.184 C275.605997,10.68 275.237997,10.792 273.781997,10.792 L272.693997,10.792 C270.949997,10.792 270.789997,10.488 270.789997,10.04 L267.621997,10.04 Z M286.267997,9.864 C286.267997,12.12 287.899997,12.712 289.787997,12.712 L291.003997,12.712 C293.451997,12.712 294.475997,11.528 294.475997,9.976 L294.475997,8.984 L291.787997,8.984 L291.787997,9.528 C291.787997,10.28 291.515997,10.504 290.523997,10.504 C289.787997,10.504 289.339997,10.376 289.339997,9.768 L289.339997,6.632 L294.107997,6.632 L294.107997,4.424 L289.339997,4.424 L289.339997,2.504 L286.267997,2.504 L286.267997,4.424 L284.731997,4.424 L284.731997,6.632 L286.267997,6.632 L286.267997,9.864 Z M300.769996,8.84 C300.769996,12.328 302.913996,12.712 304.945996,12.712 L307.249996,12.712 C309.473996,12.712 311.297996,12.264 311.297996,10.216 L311.297996,9.864 L308.417996,9.864 C308.417996,10.344 308.337996,10.792 306.673996,10.792 L305.729996,10.792 C304.449996,10.792 303.841996,10.552 303.841996,9.688 L303.841996,9.192 L311.297996,9.192 L311.297996,7.816 C311.297996,4.984 309.953996,4.296 306.689996,4.296 L304.545996,4.296 C302.305996,4.296 300.769996,4.968 300.769996,8.056 L300.769996,8.84 Z M303.841996,7.368 C303.841996,6.392 304.081996,6.216 306.081996,6.216 C307.873996,6.216 308.321996,6.392 308.321996,7.368 L303.841996,7.368 Z M320.151996,12.584 L324.247996,12.584 L325.799996,8.168 L325.831996,8.168 L327.383996,12.584 L331.479996,12.584 L334.615996,4.424 L331.255996,4.424 L329.399996,10.376 L329.367996,10.376 L327.223996,4.424 L324.407996,4.424 L322.263996,10.376 L322.231996,10.376 L320.375996,4.424 L317.015996,4.424 L320.151996,12.584 Z M340.205996,10.392 C340.205996,12.312 341.405996,12.728 343.277996,12.712 L345.373996,12.712 C346.909996,12.712 347.229996,12.536 348.077996,11.656 L348.077996,12.584 L350.989996,12.584 L350.989996,7.224 C350.989996,5.304 349.869996,4.296 347.757996,4.296 L344.189996,4.296 C341.597996,4.296 340.509996,4.664 340.509996,6.872 L343.485996,6.872 C343.517996,6.296 343.773996,6.216 344.669996,6.216 L346.477996,6.216 C347.677996,6.216 347.917996,6.504 347.917996,7.304 L347.917996,8.024 C347.325996,7.416 346.397996,7.368 344.717996,7.368 C341.741996,7.368 340.205996,7.496 340.205996,9.72 L340.205996,10.392 Z M344.797996,10.792 C343.597996,10.792 343.181996,10.584 343.181996,10.056 C343.181996,9.384 343.453996,9.096 344.749996,9.096 L346.109996,9.096 C347.805996,9.096 347.981996,9.32 347.981996,9.928 C347.981996,10.472 347.789996,10.792 345.677996,10.792 L344.797996,10.792 Z M357.907996,12.584 L360.979996,12.584 L360.979996,8.072 C360.979996,7.096 361.715996,6.696 362.771996,6.696 C364.003996,6.696 364.243996,7.192 364.243996,8.232 L366.899996,8.232 C366.915996,7.944 366.931996,7.72 366.931996,7.512 C366.931996,5.256 366.051996,4.296 363.811996,4.296 C362.419996,4.296 361.171996,4.68 360.819996,5.976 L360.787996,5.976 L360.787996,4.424 L357.907996,4.424 L357.907996,12.584 Z M376.297996,8.024 C376.297996,7.112 376.441996,6.6 377.913996,6.6 L379.721996,6.6 C380.937996,6.6 381.577996,6.872 381.577996,8.104 L381.577996,8.904 C381.577996,10.136 380.937996,10.408 379.721996,10.408 L377.913996,10.408 C376.441996,10.408 376.297996,9.896 376.297996,8.984 L376.297996,8.024 Z M373.321996,9.24 C373.321996,11.32 373.801996,12.712 377.689996,12.712 L378.585996,12.712 C380.441996,12.712 381.209996,12.088 381.545996,11.08 L381.577996,11.08 L381.577996,12.584 L384.457996,12.584 L384.457996,1 L381.385996,1 L381.385996,5.928 L381.353996,5.928 C381.161996,4.648 379.865996,4.296 378.601996,4.296 L377.689996,4.296 C373.801996,4.296 373.321996,5.688 373.321996,7.768 L373.321996,9.24 Z M391.215995,10.04 C391.215995,12.056 392.255995,12.712 395.087995,12.712 L397.999995,12.712 C401.503995,12.712 402.367995,12.152 402.367995,9.992 C402.367995,8.536 402.095995,7.304 398.415995,7.304 L396.287995,7.304 C394.687995,7.304 394.447995,7.176 394.447995,6.824 C394.447995,6.264 394.783995,6.216 396.559995,6.216 C398.399995,6.216 398.687995,6.296 398.847995,6.776 L401.919995,6.776 C401.887995,4.856 401.183995,4.296 397.167995,4.296 L395.023995,4.296 C392.911995,4.296 391.279995,4.6 391.279995,6.632 C391.279995,8.872 392.127995,9.496 394.991995,9.512 L397.871995,9.512 C398.959995,9.512 399.199995,9.704 399.199995,10.184 C399.199995,10.68 398.831995,10.792 397.375995,10.792 L396.287995,10.792 C394.543995,10.792 394.383995,10.488 394.383995,10.04 L391.215995,10.04 Z M409.125995,12.584 L412.197995,12.584 L412.197995,8.472 C412.197995,7.304 412.981995,6.696 414.293995,6.696 L414.997995,6.696 C416.341995,6.696 416.981995,7.096 416.981995,7.896 L416.981995,12.584 L420.053995,12.584 L420.053995,7.896 C420.053995,4.376 417.397995,4.296 415.493995,4.296 C413.845995,4.296 412.773995,4.6 412.229995,5.736 L412.197995,5.736 L412.197995,1 L409.125995,1 L409.125995,12.584 Z M430.363995,4.424 L427.291995,4.424 L427.291995,12.584 L430.363995,12.584 L430.363995,4.424 Z M430.363995,1 L427.291995,1 L427.291995,3.4 L430.363995,3.4 L430.363995,1 Z M440.673995,8.104 C440.673995,6.872 441.313995,6.6 442.529995,6.6 L444.145995,6.6 C445.617995,6.6 445.761995,7.112 445.761995,8.024 L445.761995,8.984 C445.761995,9.896 445.617995,10.408 444.145995,10.408 L442.529995,10.408 C441.313995,10.408 440.673995,10.136 440.673995,8.904 L440.673995,8.104 Z M437.601995,15.432 L440.673995,15.432 L440.673995,11.176 L440.705995,11.176 C441.393995,12.472 442.001995,12.712 443.745995,12.712 L444.369995,12.712 C448.257995,12.712 448.737995,11.32 448.737995,9.24 L448.737995,7.768 C448.737995,5.688 448.257995,4.296 444.369995,4.296 L443.489995,4.296 C441.697995,4.296 440.993995,4.92 440.609995,5.64 L440.577995,5.64 L440.577995,4.424 L437.601995,4.424 L437.601995,15.432 Z"
                  id="_WES-Text"
                  transform="translate(224.792997, 8.216000) scale(1, -1) translate(-224.792997, -8.216000) "
                />
              </g>
              <g
                id="Brand"
                transform="translate(372.000000, 85.500000) scale(1, -1) translate(-372.000000, -85.500000) translate(144.000000, 34.000000)"
                fill={brandFill}
              >
                <path
                  d="M7,76.664 L29.644,76.664 L29.644,58.1 L74.626,58.1 C90.64,58.1 95.434,45.452 95.434,34.436 L95.434,28.112 C95.434,13.628 90.232,2.816 68.71,2.816 L7,2.816 L7,76.664 Z M29.644,21.176 L62.896,21.176 C69.73,21.176 72.178,24.032 72.178,29.03 L72.178,31.886 C72.178,36.272 70.138,39.74 64.834,39.74 L29.644,39.74 L29.644,21.176 Z M106.042,50.756 C106.042,72.38 118.18,77.48 138.58,77.48 L175.096,77.48 C197.842,77.48 202.33,67.688 202.33,55.244 L202.33,48.308 L179.686,48.308 C179.686,57.488 176.626,58.508 166.426,58.508 L142.252,58.508 C131.542,58.508 129.298,54.428 129.298,43.718 L129.298,35.762 C129.298,26.582 131.542,20.972 143.476,20.972 L168.16,20.972 C174.892,20.972 178.768,22.502 178.768,27.806 L178.768,29.846 L201.412,29.846 C201.616,8.936 197.434,2 165.202,2 L138.58,2 C118.18,2 106.042,7.1 106.042,28.724 L106.042,50.756 Z M233.032,76.664 L259.042,76.664 L276.28,27.908 L276.484,27.908 L293.722,76.664 L319.732,76.664 L343.702,2.816 L321.568,2.816 L305.86,57.08 L305.656,57.08 L286.888,2.816 L265.876,2.816 L247.108,57.08 L246.904,57.08 L231.196,2.816 L209.062,2.816 L233.032,76.664 Z M344.824,76.664 L370.12,76.664 L376.75,63.608 L422.65,63.608 L429.688,76.664 L454.882,76.664 L414.286,2.816 L384.808,2.816 L344.824,76.664 Z M399.496,19.952 L414.184,47.696 L385.216,47.696 L399.496,19.952 Z"
                  id="_PCWA-Outlines"
                />
              </g>
            </g>
            <g
              id="Droplet"
              transform="translate(66.000000, 120.500000) scale(-1, -1) rotate(180.000000) translate(-66.000000, -120.500000) translate(13.500000, 46.000000)"
            >
              <path
                d="M85.5417076,89.2 C83.5417076,83.7 82.1417076,79.1 82.3417076,78.8 C82.6417076,78.5 85.5417076,78.1 88.9417076,77.8 L94.9417076,77.2 L91.8417076,71.6 C77.0417076,44.7 55.7417076,19.1 36.7417076,5.5 C30.4417076,1 31.6417076,0 43.8417076,0 C61.8417076,0 76.4417076,5.9 88.4417076,17.8 C104.741708,34.1 107.741708,48.2 102.041708,82 C98.9417076,100.7 95.5417076,118.3 95.0417076,118.9 C94.7417076,119.2 93.3417076,114.8 91.8417076,109.2 C90.4417076,103.6 87.6417076,94.6 85.5417076,89.2 Z"
                id="Shape"
                fill={logoRightFill}
              />
              <path
                d="M90.3133522,143.9 C81.4133522,126.1 73.5133522,118.3 50.5133522,104.6 C21.7133522,87.4 10.8133522,77.8 3.61335223,63.1 C-1.28664777,53.1 -1.18664777,36.8 3.81335223,26.6 C8.01335223,18.1 17.1133522,8.6 24.9133522,4.7 L30.4133522,2 L37.7133522,9.8 C49.7133522,22.7 79.7133522,66 78.3133522,68.3 C78.0133522,68.7 75.7133522,69.1 73.1133522,69.1 C65.4133522,69.1 65.3133522,69.5 70.5133522,80.7 C80.4133522,102 87.1133522,119.9 91.9133522,138.2 C95.0133522,150.1 94.4133522,152.1 90.3133522,143.9 L90.3133522,143.9 Z"
                id="Shape"
                fill={logoLeftFill}
              />
            </g>
          </g>
        </g>
      </svg>
    </React.Fragment>
  )
}

export default PcwaLogo
