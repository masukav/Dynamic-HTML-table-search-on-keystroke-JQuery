$(document).ready(function() {
	zebraRows('tr:odd td', 'odd');
	
	$('tbody tr').hover(function(){
	  $(this).find('td').addClass('hovered');
	}, function(){
	  $(this).find('td').removeClass('hovered');
	});
	
	
	$('tbody tr').addClass('visible');
	$('#search').show();
	
	$('#filter').keyup(function(event) {
	if (event.keyCode == 27 || $(this).val() == '') {
			$(this).val('');
			
	  $('tbody tr').removeClass('visible').show().addClass('visible');
    }
	else {
      filter('tbody tr', $(this).val());
    }
		$('.visible td').removeClass('odd');
		zebraRows('.visible:even td', 'odd');
	});
	
	$('thead th').each(function(column) {
		$(this).addClass('sortable')
					.click(function(){
						var findSortKey = function($cell) {
							return $cell.find('.sort-key').text().toUpperCase() + ' ' + $cell.text().toUpperCase();
						};
						
						var sortDirection = $(this).is('.sorted-asc') ? -1 : 1;
						var $rows		= $(this).parent()
																.parent()
																.parent()
																.find('tbody tr')
																.get();
						$.each($rows, function(index, row) {
							row.sortKey = findSortKey($(row).children('td').eq(column));
						});
						
						$rows.sort(function(a, b) {
							if (a.sortKey < b.sortKey) return -sortDirection;
							if (a.sortKey > b.sortKey) return sortDirection;
							return 0;
						});
						$.each($rows, function(index, row) {
							$('tbody').append(row);
							row.sortKey = null;
						});
						$('th').removeClass('sorted-asc sorted-desc');
						var $sortHead = $('th').filter(':nth-child(' + (column + 1) + ')');
						sortDirection == 1 ? $sortHead.addClass('sorted-asc') : $sortHead.addClass('sorted-desc');
						$('td').removeClass('sorted')
									.filter(':nth-child(' + (column + 1) + ')')
									.addClass('sorted');
						
						$('.visible td').removeClass('odd');
						zebraRows('.visible:even td', 'odd');
					});
	});
});


function zebraRows(selector, className)
{
	$(selector).removeClass(className)
							.addClass(className);
}
function filter(selector, query) {
	query	=	$.trim(query); 
  query = query.replace(/ /gi, '|'); 
  
  $(selector).each(function() {
    ($(this).text().search(new RegExp(query, "i")) < 0) ? $(this).hide().removeClass('visible') : $(this).show().addClass('visible');
  });
}