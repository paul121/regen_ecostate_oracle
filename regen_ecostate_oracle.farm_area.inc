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

  // Start a render array.
  $output = array();

  // Load current ecostate value in area.
  $ecostate = regen_ecostate_oracle_get_current_ecostate($id);

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

  // Return the render array.
  return $output;
}
