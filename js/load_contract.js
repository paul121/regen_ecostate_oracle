(function ($) {

  Drupal.behaviors.load_contract = {
    attach: function (context, settings) {
      var clientOpts = Drupal.settings.regen_ecostate_oracle.clientOpts;
      var address = Drupal.settings.regen_ecostate_oracle.contract;

      if (address && clientOpts) {

        CosmWasm.getClient(clientOpts).then((client) => {

          client.getContract(address).then((result) => {
            $('#contract-label', context).html(
              `<h4>Label: ${result.label}</h4>`
            );
            $('#contract-codeId', context).html(
              `<h4>Code ID: <a href="https://regen.wasm.glass/codes/${result.codeId}">${result.codeId}</a></h4>`
            );
            $('#contract-creator', context).html(
              `<h4>Creator: <a href="https://regen.wasm.glass/accounts/${result.creator}">${result.creator}</a></h4>`
            );
            $('#contract-initMsg', context).html(
              `<p>Init Message:</p><pre>${JSON.stringify(result.initMsg)}</pre>`
            );
          });

          client.queryContractSmart(address, { "get_state": {} }).then((result) => {
            var response = JSON.parse(new TextDecoder("utf-8").decode(result));
            $('#contract-state', context).html(`<p>State:</p><pre>${JSON.stringify(response.state)}</pre>`);
          });

          client.queryContractSmart(address, { "get_ecostate": {} }).then((result) => {
            var response = JSON.parse(new TextDecoder("utf-8").decode(result));
            $('#contract-ecostate', context).html( `<h4>Current Ecostate: ${JSON.stringify(response.ecostate)}</h4>`);
          });
        });

      } else {
        console.log('No contract.');
      }
    }
  };

}(jQuery));
