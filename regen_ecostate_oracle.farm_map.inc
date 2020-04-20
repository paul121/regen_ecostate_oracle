<?php
/**
 * @file
 * Farm Map hooks implemented by the Regen Ecostate Oracle module.
 */

/**
 * Implements hook_farm_map_view().
 */
function regen_ecostate_oracle_farm_map_view($name, $element) {

  if ($name == 'ecostate-dashboard-map') {
    farm_map_add_behavior('popup');
    farm_map_add_behavior('areas', array('zoom' => TRUE));
  }
}
