import { BrowserPolicy } from 'meteor/browser-policy-common';
// e.g., BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
// Allow images from Open Library
BrowserPolicy.content.allowImageOrigin( '*.openlibrary.org' );
// Allow fonts from local
BrowserPolicy.content.allowFontDataUrl(  );
