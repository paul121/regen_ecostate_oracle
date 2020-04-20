<?php
/**
 * @file
 * Code for Regen Ecostate Oracle
 */


/*
 * Implements hook_farm_area_details().
 * Add details about the ecostate contract to area popup.
 */
function regen_ecostate_oracle_farm_area_details($id) {

  // Build a query to find a log that references an asset.
  $query = farm_quantity_log_query('ratio', 'ecostate', $done = TRUE, $type = 'farm_observation');
  // Add a query tag to identify where this came from.
  $query->addTag('regen_ecostate_oracle_log_query');
  $query->join('field_data_field_farm_area', 'ss_fdffa', "ss_fdffa.entity_id = ss_log.id");
  $query->where('ss_fdffa.field_farm_area_tid = ' . $id);
  $query->range(0,1);

  // Execute the query and gather the log ids.
  $result = $query->execute();
  $log_ids = array();
  foreach ($result as $row) {
    if (!empty($row->id)) {
      $log_ids[] = $row->id;
    }
  }

  // Start a render array.
  $output = array();

  // If there are log IDs, load the logs.
  $log = NULL;
  if (!empty($log_ids)) {
    $log = log_load($log_ids[0]);
    $ecostate = farm_quantity_log_data($log, 'ratio', 'ecostate')[0]['value'];

    $output[] = array(
      '#type' => 'markup',
      '#markup' => '<h5>Current Ecostate: <strong>' . $ecostate . '%</strong></h5>',
      '#weight' => -50
    );

    $output[] = array(
      '#type' => 'markup',
      '#markup' => '<h5>' . l(t('Contract Details'), 'farm/ecostate/area/'. $id) . '</h5>',
      '#weight' => -50
    );
  }

  // Return the render array.
  return $output;
}
