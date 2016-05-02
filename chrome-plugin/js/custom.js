$( document ).ready( function() {
  url = $( location ).attr( 'href' );

  //Event Click: More formats
  $( document ).on( 'click', '#btnMore', function() {
    $( this ).remove();
    $( '#tableMore' ).removeClass( 'hide' );
  });

  //Event form: Save settings
  $( '#saveSettings' ).submit( function( e ) {
    e.preventDefault();
    localStorage['ydlcpServer'] = $( '#server' ).val();
    localStorage['ydlcpPort'] = $( '#port' ).val();
    localStorage['ydlcpPrefix'] =$( '#prefix' ).val();
    $( location ).attr( 'hash', '#Extractors' );
  });

  //Event form: Get video from url
  $( '#getVideo' ).submit( function( e ) {
    e.preventDefault();
    if( $( location ).attr( 'hash' ) == '#Get' ) {
      main( 'Get' );
    } else {
      $( location ).attr( 'hash', '#Get' );
    }
  });

  //Event: Change page
  $( window ).on( 'hashchange', function() {
    main( getPage() );
  });

  //Get request with get vars or not
  if( url.split( '?' ).length != 1 ) {
    $( '#vidoeUrl' ).val( url.substr( url.indexOf( '?' ) + 1, url.length ) );
    $( location ).attr( 'hash','#Get' );
  } else {
    main( getPage() );
  }
});

function main( page ) {
  initUI();
  loadPage( page );
}

function initUI() {
  //Containers
  $( '#main' ).hide();
  $( '#get' ).hide();
  $( '#extractors' ).hide();
  $( '#settings' ).hide();
  $( '#loading' ).show();

  //Buttons
  $( '#btnExtractors' ).removeClass( 'active' );
  $( '#btnSettings' ).removeClass( 'active' );

  //Status
  $( '#alertLoading' ).hide();
  $( '#imgLoading' ).show();

  //Remove old tags
  $( '.remove' ).remove();
}

function getPage() {
  if( $( location ).attr( 'hash' ) == '' ) {
    return 'Settings';
  } else {
    return $( location ).attr( 'hash' ).substr( 1 );
  }
}

function loadPage( page ) {
  switch( page ) {
    case 'Main':       loadMain();       break;
    case 'Get':        loadGet();        break;
    case 'Extractors': loadExtractors(); break;
    case 'Settings':   loadSettings();   break;
  }
}

function loadMain() {
  $.get( 'version.txt', function( version ) {
    $.getJSON( getAPIURL() + '/version', function( data ) {
      $( '#main' ).append( '<ul class="list-group remove">' );
      $.each( data, function( key, val ) {
        $( '#main' ).append(
          '<li class="list-group-item col-md-4 remove">' +
          '<span class="badge">' + val + '</span>' +
          key +
          '</li>'
        );
      });
      $( '#main' ).append(
        '<li class="list-group-item col-md-4 remove">' +
        '<span class="badge">' + version + '</span>' +
        'youtube-dl-chrome-plugin' +
        '</li>' +
        '</ul>'
      );
    })
    .fail( function() {
      $( '#hMain' ).append( ' <small class="remove">' + version + '</small>' );
    })
    .always( function() {
      $( '#loading' ).hide();
      $( '#main' ).show();
      $.get( 'https://raw.githubusercontent.com/r4mos/youtube-dl-chrome-plugin/master/chrome-plugin/version.txt', function( githubVersion ) {
        if( version != githubVersion ) {
          $( '#main' ).prepend(
            '<div class="alert alert-dismissible alert-warning remove">' +
              '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
              '<p>New version available on <a href="https://github.com/r4mos/youtube-dl-chrome-plugin">github</a></p>' +
            '</div>'
          );
        }
      });
    });
  });
}

function loadSettings() {
  $( '#btnSettings' ).addClass( 'active' );

  if( typeof( localStorage['ydlcpServer'] ) == 'undefined' ) {
    $( '#server' ).val( 'localhost' );
  } else {
    $( '#server' ).val( localStorage['ydlcpServer'] );
  }

  if( typeof( localStorage['ydlcpPort'] ) == 'undefined' ) {
    $( '#port' ).val( '9191' );
  } else {
    $( '#port' ).val( localStorage['ydlcpPort'] );
  }

  if( typeof( localStorage['ydlcpPrefix'] ) == 'undefined' ) {
    $( '#prefix' ).val( '' );
  } else {
    $( '#prefix' ).val( localStorage['ydlcpPrefix'] );
  }

  $( '#loading' ).hide();
  $( '#settings' ).show();
}

function getAPIURL() {
  api = 'http://';
  if( typeof( localStorage['ydlcpServer'] ) == 'undefined' ) {
    api += 'localhost';
  } else {
    api += localStorage['ydlcpServer'];
  }
  api += ':';
  if( typeof( localStorage['ydlcpPort'] ) == 'undefined' ) {
    api += '9191';
  } else {
    api += localStorage['ydlcpPort'];
  }
  api += '/api'
  return api;
}

function loadExtractors() {
  $( '#btnExtractors' ).addClass( 'active' );
  $.getJSON( getAPIURL() + '/extractors', function( data ) {
    $.each( data.extractors, function( key, val ) {
      if( val.working ) {
        icon = 'glyphicon-ok';
      } else {
        icon = 'glyphicon-remove';
      }
      $( '#extractors' ).append(
        '<div class="col-md-3 remove">' +
        '<span class="glyphicon ' + icon + '" aria-hidden="true"></span> ' +
        val.name +
        '</div>'
      );
    });
    $( '#loading' ).hide();
    $( '#extractors' ).show();
  })
  .fail( function() {
    $( '#alertLoading' ).show();
    $( '#imgLoading' ).hide();
  });
}

function loadGet() {
  /* Waiting for https://github.com/jaimeMF/youtube-dl-api-server/pull/43 */
  //$.getJSON( getAPIURL() + '/version', function( data ) {
  //  $.each( data, function( key, val ) {
  //    if( key == 'youtube-dl' ) {
  //      $( '#getLegend' ).append(
  //        ' <span class="badge remove">' +
  //        val +
  //        '</span>'
  //      );
  //    }
  //  });
  /* Meanwhile use */
  $.getJSON( getAPIURL() + '/extractors', function( data ) {
    loadGetContent();
  })
  .fail( function() {
    $( '#alertLoading' ).show();
    $( '#imgLoading' ).hide();
  });
}

function loadGetContent() {
  $.getJSON( getAPIURL() + '/info', { 'url': $( '#vidoeUrl' ).val() }, function( data ) {
    var prefix = '';
    if( typeof( localStorage['ydlcpPrefix'] ) != 'undefined' ) {
      prefix = localStorage['ydlcpPrefix'];
    }

    html  = '<div class="col-md-4 remove">';
    html += '  <img src="' + data.info.thumbnail + '" class="img-responsive img-thumbnail"/>';
    html += '</div>';
    html += '<div class="col-md-8 remove">';
    html += '  <h3>' + data.info.title + '</h3>';
    html += '  <p class="text-muted">';
    html += '    <span class="glyphicon glyphicon-resize-full" aria-hidden="true"></span> ';
    html +=      data.info.format.split( ' - ' )[1];
    html += '    <br/>';
    html += '    <span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span> ';
    html +=      data.info.ext;
    html += '  </p>';
    html += '  <p>';
    html += '    <a href="' + prefix + data.info.url + '" class="btn btn-primary">';
    html += '      <span class="glyphicon glyphicon-play" aria-hidden="true"></span>';
    html += '      Play';
    html += '    </a>';
    html += '    <a href="' + prefix + data.info.url + '" class="btn btn-primary" download>';
    html += '      <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>';
    html += '      Download';
    html += '    </a>';
    if( data.info.formats != null ) {
      html += '  <a id="btnMore" class="btn btn-default">';
      html += '    <span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span>';
      html += '    More';
      html += '  </a>';
    }
    html += '  </p>';
    if( data.info.formats != null ) {
      html += '<hr/>';
      html += '<table id="tableMore" class="table table-striped table-hover hide">';
      html += '  <thead>';
      html += '    <tr>';
      html += '      <th><span class="glyphicon glyphicon-resize-full" aria-hidden="true"></span> Extension</th>';
      html += '      <th><span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span> Format</th>';
      html += '      <th><span class="glyphicon glyphicon-link" aria-hidden="true"></span> Links</th>';
      html += '    </tr>';
      html += '  </thead>';
      html += '  <tbody>';
      $.each( data.info.formats, function( key, val ) {
        html += '  <tr>';
        html += '    <td>' + val.ext + '</td>';
        html += '    <td>' + val.format.split( ' - ' )[1] + '</td>';
        html += '    <td>';
        html += '    <a href="' + prefix + val.url + '" class="btn btn-default">';
        html += '      <span class="glyphicon glyphicon-play" aria-hidden="true"></span>';
        html += '      Play';
        html += '    </a>';
        html += '    <a href="' + prefix + val.url + '" class="btn btn-default" download>';
        html += '      <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>';
        html += '      Download';
        html += '    </a>';
        html += '    </td>';
        html += '  </tr>';
      });
      html += '  </tbody>';
      html += '</table> ';
    }
    html +=   '</div>';
    $( '#get' ).append( html );
  })
  .fail( function() {
    $( '#get' ).append(
      '<div class="alert alert-dismissible alert-danger remove">' +
      '  <span class="glyphicon glyphicon-exclamation-sign"' +
      '    aria-hidden="true"></span>' +
      '  <strong>No videos found</strong>' +
      '</div>'
    );
  })
  .always( function() {
    $( '#loading' ).hide();
    $( '#get' ).show();
  });
}
