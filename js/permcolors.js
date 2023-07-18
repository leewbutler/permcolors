/**
 * @file
 *
 * Permissions page color coding. This JS applies CSS classes whos names
 * are formatted to indicate checkbox status like so...
 *
 *    <TD class="permcolors--[was/is/got]-[checked/unchecked/disabled]"/>
 *
 * They are applied to each permission <TD> on the permissions page to more
 * clearly indicated (via color coding) the existing and changed permissions
 * the user is about to commit to upon save.
 */

// Drupal behaviors fire on "document.ready". By design we instead fire after
// that on "window.load" after all other js is done modifying the page.
(function ($) {
  $(window).one('load', function () {

    // Add a class to the module title rows.
    $('form.user-admin-permissions td[colspan]').not('[colspan=1]').each(function () {
      $(this).closest( "tr" ).addClass("permcolors--module-title");
    });

    // For each visible checkbox.
    $('form.user-admin-permissions input[type="checkbox"]:visible').each(function () {

      // Add "--was--[FOO]" classes to record "on load" status of any
      // active checkboxes so we can then track any subsequent changes.
      $(this).closest("td").addClass( $(this).is(':checked') ? "permcolors--was-checked" : "permcolors--was-unchecked");

      // Add "--is--[FOO]" classes to record "on load" status of any
      // disabled checkboxes.
      if ( $(this).is('[readonly]') || $(this).is('[disabled]')) {
        $(this).closest( "td" ).addClass("permcolors--is-disabled");
      }

      // Add "--got-[FOO]" classes to record "post load" changes of any
      // changed checkboxes.
      $(this).change(function () {
        if(this.checked) {
          $(this).closest( "td" ).removeClass("permcolors--got-unchecked").addClass("permcolors--got-checked");
        }
        else {
          $(this).closest( "td" ).removeClass("permcolors--got-checked").addClass("permcolors--got-unchecked");
        }
      });
    });
  }); // End window.load
})(jQuery);
