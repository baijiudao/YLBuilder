TEMPLATE    = lib

TARGET      = qtnribbondsgn

!debug_and_release|build_pass {
    CONFIG(debug, debug|release) {
        TARGET = $$member(TARGET, 0)d
    }
}

include($$PWD/../shared/platform.pri)
include($$PWD/../styles/styles.pri)
include($$PWD/../ribbon/ribbon.pri)

DESTDIR = $$PWD/../../lib
DESTDIR = $$member(DESTDIR, 0)$$QTITAN_LIB_PREFIX

VERSION = $$QTN_COMPONENT_VERSION

QMAKE_TARGET_COMPANY = Developer Machines
QMAKE_TARGET_PRODUCT = QtitanRibbon Design-Time
QMAKE_TARGET_DESCRIPTION = QtitanRibbon plugin for QtDesigner
QMAKE_TARGET_COPYRIGHT = Copyright (C) 2009-2015 Developer Machines

contains(CONFIG, demo) {
    QMAKE_TARGET_DESCRIPTION = QtitanRibbon plugin for QtDesigner (Demo version)
}

DSGN_HEADERS += \
               $$PWD/QtnRibbonDsgnPlugin.h \
               $$PWD/QtnRibbonDsgnContainer.h \
               $$PWD/QtnRibbonDsgnTaskMenu.h \
               $$PWD/QtnRibbonPageDsgnPlugin.h \
               $$PWD/QtnRibbonPlugins.h \
               $$PWD/QtnMainWindowDsgnPlugin.h \
               $$PWD/QtnMainWindowDsgnContainer.h \
               $$PWD/QtnMainWindowDsgnTaskMenu.h \
               $$PWD/QtnStatusBarDsgnPlugin.h \
               $$PWD/QtnCommandDsgn.h \
               $$PWD/QtnRibbonBackstageViewPlugin.h \
               $$PWD/QtnRibbonStyleDsgnPlugin.h \
               $$PWD/QtnRibbonGroupDsgnPlugin.h \
#              $$PWD/QtnOfficeOptionsDialogPlugin.h

DSGN_SOURCES += \
               $$PWD/QtnRibbonDsgnPlugin.cpp \
               $$PWD/QtnRibbonDsgnContainer.cpp \
               $$PWD/QtnRibbonDsgnTaskMenu.cpp \
               $$PWD/QtnRibbonPageDsgnPlugin.cpp \
               $$PWD/QtnRibbonPlugins.cpp \
               $$PWD/QtnMainWindowDsgnPlugin.cpp \
               $$PWD/QtnMainWindowDsgnContainer.cpp \
               $$PWD/QtnMainWindowDsgnTaskMenu.cpp \
               $$PWD/QtnStatusBarDsgnPlugin.cpp \
               $$PWD/QtnCommandDsgn.cpp \
               $$PWD/QtnRibbonBackstageViewPlugin.cpp \
               $$PWD/QtnRibbonStyleDsgnPlugin.cpp \
               $$PWD/QtnRibbonGroupDsgnPlugin.cpp \
#              $$PWD/QtnOfficeOptionsDialogPlugin.cpp

DSGN_RESOURCES += \
    $$PWD/QtnRibbonDsgnResources.qrc

HEADERS += $$DSGN_HEADERS
SOURCES += $$DSGN_SOURCES
RESOURCES += $$DSGN_RESOURCES

CONFIG += plugin

!lessThan(QT_VER_MAJ, 5) {
  QT += widgets designer core-private widgets-private gui-private designer
} else {
  CONFIG      += designer
  DLLDESTDIR = $$PWD/../../bin
  DLLDESTDIR = $$member(DLLDESTDIR, 0)$$QTITAN_LIB_PREFIX
}

DEFINES += QTITAN_LIBRARY_STATIC
DEFINES += QTITAN_DESIGNER


