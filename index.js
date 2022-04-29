import * as rainSDK from "rain-sdk";
import { ethers} from "ethers";

// tutorial: https://docs.rainprotocol.xyz/guides/SDK/using-the-rain-sdk-to-deploy-a-sale-example-with-opcodes/
export async function saleExample() {

  try {

    let res = await fetch(`https://api.thegraph.com/subgraphs/name/beehive-innovation/rain-protocol-v2-polygon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            sale(id:"0x0373075943f72ad01ea98a92caa58e2cca439572") {
              id
              address
              factory {
                id
              }
              token {
                name
                symbol
              }
              reserve {
                name
                symbol
              }
              unitsAvailable
              totalRaised
              percentRaised
              saleStatus
            }
          }
        `
      })
    });

    res = await res.json();
    const saleData = res.data.sale;
    console.log(saleData);

    const theDiv = document.getElementById("data");
    // format sale data (in an actual example, don't use innerHTML which could be vulnerable to xss https://stackoverflow.com/questions/5677799/how-to-append-text-to-a-div instead use a framework like React ideally)
    theDiv.innerHTML += `
      Sale: ${saleData.token.name} (${saleData.token.symbol})<br/>
      Raising: ${saleData.reserve.name} (${saleData.token.symbol})<br/>
      Percent Raised ${saleData.percentRaised}<br/>
      Total Raised: ${saleData.totalRaised}<br/>
      Units Available: ${saleData.unitsAvailable}<br/><br/>
      Contract Address ${saleData.address}
      
    `;

  } catch (err) {
    console.log(err);
  }
}

saleExample();