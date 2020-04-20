(function ($) {

  Drupal.behaviors.update_ecostate = {
    attach: function (context, settings) {
      var address = Drupal.settings.regen_ecostate_oracle.contract;
      var clientOpts = Drupal.settings.regen_ecostate_oracle.clientOpts;

      if (clientOpts && address) {

        $('#update-ecostate').once().click(function() {
          // Disable the update ecostate button.
          $('#update-ecostate').attr('disabled', false);

          // Update status to loading.
          $('input[name=status]').val("Loading...");

          // Make the ecostate readonly, get the new ecostate value.
          $('input[name=new_ecostate]').attr('readonly', 'readonly');
          var newEcostate = +$('input[name=new_ecostate]').val();

          // Update ecostate value on contract.
          CosmWasm.getClient(clientOpts).then((client) => {

            client.execute(address, { "update_ecostate": { ecostate: newEcostate } }).then((result) => {
              // On success..
              $('input[name=status]').val("Success.");
              console.log(result);

              // Save the response.
              $('input[name=new_transaction]').val(JSON.stringify(result));

              // Click the hidden submit button to submit form.
              $('#submit-ecostate').click();
            }).catch((error) => {

              // Display error.
              $('input[name=status]').val(error);

              // Enable button and ecostate value textfield.
              $('#update-ecostate').attr('disabled', false);
              $('input[name=new_ecostate]').attr('readonly', '');
              console.log(error);
            });
          }).catch((error) => {
            // Display error.
            $('input[name=status]').val(error);

            // Enable button and ecostate value textfield.
            $('#update-ecostate').attr('disabled', false);
            $('input[name=new_ecostate]').attr('readonly', '');
            console.log(error);
          });
        });
      }
    }
  };

}(jQuery));
