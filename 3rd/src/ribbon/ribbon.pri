
QTN_COMPONENT_VERSION = 3.3.0
DEFINES += QTN_VERSION_RIBBON=$$QTN_COMPONENT_VERSION

INCLUDEPATH += $$quote($$PWD/../../include)

ALL_SOURCES += \
    $$PWD/QtnRibbonSliderPane.cpp \
    $$PWD/QtnRibbonStatusBar.cpp \
    $$PWD/QtnRibbonTabBar.cpp \
    $$PWD/QtnRibbonSystemPopupBar.cpp \
    $$PWD/QtnRibbonPage.cpp \
    $$PWD/QtnRibbonGroupLayout.cpp \
    $$PWD/QtnRibbonGroup.cpp \
    $$PWD/QtnRibbonBar.cpp \
    $$PWD/QtnRibbonPrivate.cpp \
    $$PWD/QtnRibbonMainWindow.cpp \
    $$PWD/QtnRibbonButton.cpp \
    $$PWD/QtnRibbonToolTip.cpp \
    $$PWD/QtnRibbonQuickAccessBar.cpp \
    $$PWD/QtnOfficePopupColorButton.cpp \
    $$PWD/QtnRibbonGallery.cpp \
    $$PWD/QtnOfficePopupMenu.cpp \
    $$PWD/QtnRibbonBackstageView.cpp \
    $$PWD/QtnOfficePopupWindow.cpp \
#   $$PWD/QtnOfficeOptionsDialog.cpp \
#   $$PWD/QtnRibbonCustomizeDialog.cpp \
#   $$PWD/QtnRibbonCustomizationManager.cpp \

INCLUDE_HEADERS += \
    $$PWD/../../include/QtitanRibbon.h \
    $$PWD/../../include/QtitanDef.h \
    $$PWD/../../include/QtnRibbonBackstageView.h \
    $$PWD/../../include/QtnRibbonBar.h \
    $$PWD/../../include/QtnRibbonGallery.h \
    $$PWD/../../include/QtnRibbonGroup.h \
    $$PWD/../../include/QtnRibbonMainWindow.h \
    $$PWD/../../include/QtnRibbonPage.h \
    $$PWD/../../include/QtnRibbonQuickAccessBar.h \
    $$PWD/../../include/QtnRibbonSliderPane.h \
    $$PWD/../../include/QtnRibbonStatusBar.h \
    $$PWD/../../include/QtnRibbonSliderPane.h \
    $$PWD/../../include/QtnRibbonSystemPopupBar.h \
    $$PWD/../../include/QtnRibbonToolTip.h

PRIVATE_HEADERS += \
    $$PWD/QtnRibbonBarPrivate.h \
    $$PWD/QtnRibbonGroupPrivate.h \
    $$PWD/QtnRibbonPrivate.h \
    $$PWD/QtnRibbonGalleryPrivate.h \
    $$PWD/QtnRibbonBackstageViewPrivate.h \
    $$PWD/QtnOfficeFrameHelper.h

PUBLIC_HEADERS += \
    $$PWD/QtnOfficeDefines.h \
    $$PWD/QtnRibbonSliderPane.h \
    $$PWD/QtnRibbonStatusBar.h \
    $$PWD/QtnRibbonTabBar.h \
    $$PWD/QtnRibbonSystemPopupBar.h \
    $$PWD/QtnRibbonPage.h \
    $$PWD/QtnRibbonGroupLayout.h \
    $$PWD/QtnRibbonGroup.h \
    $$PWD/QtnRibbonBar.h \
    $$PWD/QtnRibbonMainWindow.h \
    $$PWD/QtnRibbonButton.h \
    $$PWD/QtnRibbonToolTip.h \
    $$PWD/QtnRibbonQuickAccessBar.h \
    $$PWD/QtnOfficePopupColorButton.h \
    $$PWD/QtnRibbonGallery.h \
    $$PWD/QtnOfficePopupMenu.h \
    $$PWD/QtnRibbonBackstageView.h \
    $$PWD/QtnOfficePopupWindow.h \
#	$$PWD/QtnOfficeOptionsDialog.h \
#	$$PWD/QtnOfficeOptionsDialogPrivate.h \
#	$$PWD/QtnRibbonCustomizeDialog.h \
#	$$PWD/QtnRibbonCustomizationManager.h \
#	$$PWD/QtnRibbonCustomizationManagerPrivate.h \

WINDOWS_SOURCES += $$PWD/QtnOfficeFrameHelper_win.cpp
LINUX_SOURCES +=
MACOSX_SOURCES +=

    
WINDOWS_HEADERS += $$PWD/QtnOfficeFrameHelper_win.h
LINUX_HEADERS +=
MACOSX_HEADERS +=


HEADERS += \
    $$PUBLIC_HEADERS \
    $$PRIVATE_HEADERS

win32:HEADERS += $$WINDOWS_HEADERS
linux:HEADERS += $$LINUX_HEADERS
macx:HEADERS += $$MACOSX_HEADERS

SOURCES += \
    $$ALL_SOURCES

win32:SOURCES += $$WINDOWS_SOURCES
linux:SOURCES += $$LINUX_SOURCES
macx:OBJECTIVE_SOURCES += $$MACOSX_SOURCES


RESOURCES += \
    $$PWD/QtnRibbonResources.qrc
   
win32 {
    DEFINES += _WINDOWS
    LIBS += -luser32 -lgdi32 -lshell32 -lcomctl32
}

macx {
    LIBS += -framework AppKit
}
