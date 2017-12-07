TEMPLATE = lib

TARGET = qtnribbon

!debug_and_release|build_pass {
    CONFIG(debug, debug|release) {
        TARGET = $$member(TARGET, 0)d
    }
}

include($$PWD/../platform.pri)
include($$PWD/../../styles/styles.pri)
include($$PWD/../../ribbon/ribbon.pri)

contains(CONFIG, demo) {
include($$PWD/../qtitandemo.pri)
}

DESTDIR = $$PWD/../../../lib
DESTDIR = $$member(DESTDIR, 0)$$QTITAN_LIB_PREFIX
contains(QMAKE_HOST.arch, x86_64) {
    DESTDIR = $$DESTDIR/X64
}

VERSION = $$QTN_COMPONENT_VERSION

QMAKE_TARGET_COMPANY = Developer Machines
QMAKE_TARGET_PRODUCT = QtitanRibbon
QMAKE_TARGET_DESCRIPTION = QtitanRibbon UI component for Digia Qt.C++
QMAKE_TARGET_COPYRIGHT = Copyright (C) 2009-2015 Developer Machines

!lessThan(QT_VER_MAJ, 5) {
  QT += widgets core-private widgets-private gui-private
} else {
  DLLDESTDIR = $$PWD/../../../bin
  DLLDESTDIR = $$member(DLLDESTDIR, 0)$$QTITAN_LIB_PREFIX
}

DEFINES += QTITAN_LIBRARY


