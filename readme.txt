------------------------------------------------------------------------------
Echo3 Client-Side JavaScript Demonstration Application
Copyright (C) 2002-2008 NextApp, Inc.

http://echo.nextapp.com/

------------------------------------------------------------------------------
The Echo3 JavaScript Demonstration Application, Echo3 Framework, and Echo3 
Extras Library are licensed under the Mozilla Public License.
This license may be found at: http://echo.nextapp.com/site/license/mpl

This distribution includes the Yahoo YUI Compressor, which is used for 
compressing JavaScript files.  More inforamtion about the YUI Compressor may 
be found here: http://developer.yahoo.com/yui/compressor/  The YUI Compressor
is distributed under the BSD license: 
http://developer.yahoo.com/yui/license.html

This distribution contains public domain photography from 
http://publicdomainpictures.net.

------------------------------------------------------------------------------
Please feel free to contact NextApp with any questions regarding Echo:

NextApp, Inc.                  http://www.nextapp.com       
2549-B Eastbluff Drive #201    http://echo.nextapp.com/site/forum (Dev Forums)
Newport Beach, CA 92660
USA        

TEL: +1.949.340.2097

==============================================================================
USING THIS APPLICATION

This application is written entirely in client-side JavaScript, using the
NextApp Core.js, Echo3, and Echo3 Extras frameworks.  It does NOT need to
be installed on a web server.  You may directly browse to the HTML files
on your computer's filesystem and use the application (MSIE will display a
security warning, but it can be bypassed).

To view the application locally, visit the file src/index-dev.html in your 
browser.  The index-dev.html file uses uncompressed JavaScript files 
contained in the src/lib and src/app directories.

To build a version of the application with compressed JavaScript suitable 
for online use, you will need to use Java (1.4+) and the Apache Ant build 
tool.  Apache Ant can be obtained from http://ant.apache.org.   Once ant
is installed, simply run "ant" form the root folder of the application
(which contains a "build.xml" file).  The JavaScript will be compressed,
and an host-able version of the application will be placed in the "out/"
folder.  Note that Java is only required for the build process to work,
the application itself does not depend on it.
