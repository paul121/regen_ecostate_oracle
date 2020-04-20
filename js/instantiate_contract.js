(function ($) {

  Drupal.behaviors.instantiate_contract = {
    attach: function (context, settings) {
      var clientOpts = Drupal.settings.regen_ecostate_oracle.clientOpts;

      if (clientOpts) {

        $('#instantiate-contract', context).once().click(function() {

          CosmWasm.getClient(clientOpts).then((client) => {

            $('#instantiate-contract').attr('disabled', true);

            $('input[name=instantiate_status]').val("Loading...");

            const opts = {
              oracle: 'xrn:1k70df4949vmhmx96ckj8r92lkmv6zv4m9aqn3s',
              codeId: +$('input[name=instantiate_code_id]').val(),
              beneficiary: $('input[name=instantiate_beneficiary]').val(),
              totalTokens: +$('input[name=instantiate_total_tokens]').val(),
              ecostate: +$('input[name=instantiate_ecostate]').val(),
              region: $('input[name=instantiate_region]').val(),
              label: $('input[name=instantiate_label]').val(),
            };

            const initMsg = {
              oracle: opts.oracle,
              beneficiary: opts.beneficiary,
              ecostate: opts.ecostate,
              region: opts.region,
              total_tokens: opts.totalTokens,
            };

            client.instantiate(opts.codeId, initMsg, opts.label, 'Instantiated from farmOS').then((result) => {
              console.log(result);

              $('input[name=instantiate_status]').val("Success.");

              var tx = result;
              var address = result.contractAddress;
              $('input[name=instantiate_tx]').val(JSON.stringify(tx));
              $('input[name=instantiate_address]').val(String(address));

              $('#submit-contract').click();
            }).catch((error) => {
              $('#instantiate-contract').attr('disabled', false);

              $('input[name=instantiate_status]').val(error);
              console.log(error);
            });
          }).catch((error) => {
            $('input[name=instatntiate_status]').val(error);
            console.log(error);
          });
        });
      }
    }
  };

}(jQuery));
