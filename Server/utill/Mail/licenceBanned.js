var licenceBanned = function (name, fineAmount, mailType) {
  let title = "";
  let button = "";

  return `
  <div>
  <div class="adM"></div>
  <div
    style="
      font-family: Open Sans, sans-serif;
      box-sizing: border-box;
      max-width: 600px;
      background: #ffdc00;
      overflow: auto;
    "
  >
    <div class="adM"></div>
    <div style="background: #fff; margin: 24px; padding: 0; overflow: hidden">
      <div class="adM"></div>
      <div>
        <div class="adM"></div>
        <table
          style="
            margin: 0;
            padding: 0;
            border: none;
            border-collapse: collapse;
            border-spacing: 0;
          "
        >
          <tbody>
            <tr>
              <td style="margin: 0; padding: 0; width: 60%">
                <img
                  style="width: 120px; margin: 24px 24px 16px 24px"
                  src="https://lh3.googleusercontent.com/pw/AL9nZEV5ZoNPvJXwWyNppStne3yxuPPRS_hNNmfQ_poGs2Z03C_RdRpHJ1B9dgEPcneUv073L6QwFnfleZRSP3-Bu4OxFmmLrNtRVw23lfzHX6yMamlJ1o-CdwZYKWMVyj8tv7D_6QNE0Ymh-FxjbSK1QHCq=s512-no?authuser=0"
                  alt="Smartr logo"
                  class="CToWUd"
                  data-bit="iit"
                />
                <p
                  style="
                    margin: 0 10px 10px 24px;
                    font-size: 18px;
                    color: #737373;
                    word-break: break-word;
                  "
                >
                  From Driving Penalty System
                </p>
                <p
                  style="
                    margin: 24px;
                    color: #464048;
                    font-size: 20px;
                    word-break: break-word;
                  "
                >
                  Hi ${name},<br />We're Sorry <br /> Your licence has been banned due to your driver point is over.
                </p>
              </td>
              <td style="padding: 0; margin: 0; vertical-align: top">
                <div style="width: 100%; height: auto">
                  <img
                    style="max-width: 100%; height: auto"
                    src="https://ci4.googleusercontent.com/proxy/5HPthtv99uO6IxKbHUVyLo7ViRctBOzVOUXIAGjOk4tqlrQEB0ocehSM4FypSoYftqr8ICKcxowUz2rFuQ2hMV0i3El4dWSSRGWyec87bgQ-oYX5BBzQel1vp5lt5qU2hDo2-3hAGcdcHq14anFscwJfU1aU6mdgP8I2I_a8JQ=s0-d-e1-ft#https://av-www.smartrecruiters.com/candidate-portal-ui/static/images/candidate-emails/email_confirmation.png"
                    class="CToWUd a6T"
                    data-bit="iit"
                    tabindex="0"
                  />
                  <div
                    class="a6S"
                    dir="ltr"
                    style="opacity: 0.01; left: 528.188px; top: 269px"
                  >
                    <div
                      id=":pp"
                      class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
                      role="button"
                      tabindex="0"
                      aria-label="Download attachment "
                      data-tooltip-class="a1V"
                      data-tooltip="Download"
                    >
                      <div class="akn"><div class="aSK J-J5-Ji aYr"></div></div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p
        style="
          text-align: center;
          color: #464048;
          font-size: 14px;
          margin: 30px 24px 15px;
          word-break: break-word;
        "
      >
      Please reach out your nearest police station to make your licence active
        <strong></strong>.
      </p>
    </div>
  </div>
</div>
        `;
};

export default licenceBanned;
