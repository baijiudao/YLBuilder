
QTITANDIR = $$quote($$(QTITANDIR))
DEFINES += QTITAN_LIBRARY_STATIC

include($$QTITANDIR/src/shared/platform.pri)
include($$QTITANDIR/src/styles/styles.pri)
include($$QTITANDIR/src/ribbon/ribbon.pri)


