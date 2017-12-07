
ALL_SOURCES += \
    $$PWD/QtnCommonStyle.cpp \
    $$PWD/QtnOfficeStyle.cpp \
    $$PWD/QtnRibbonStyle.cpp \
    $$PWD/QtnStyleHelpers.cpp \
    $$PWD/QtnPopupHelpers.cpp \
    $$PWD/QtnCommonPaintManager.cpp \
    $$PWD/QtnOfficePaintManager.cpp \
    $$PWD/QtnRibbonPaintManager.cpp \

INCLUDE_HEADERS += \
    $$PWD/../../include/QtnCommonStyle.h \
    $$PWD/../../include/QtnOfficeDefines.h \
    $$PWD/../../include/QtnOfficePopupColorButton.h \
    $$PWD/../../include/QtnOfficePopupMenu.h \
    $$PWD/../../include/QtnOfficePopupWindow.h \
    $$PWD/../../include/QtnOfficeStyle.h \
    $$PWD/../../include/QtnRibbonStyle.h \
   $$PWD/../../include/QtnStyleHelpers.h

PRIVATE_HEADERS += \
    $$PWD/QtnCommonStylePrivate.h \
    $$PWD/QtnOfficeStylePrivate.h \
    $$PWD/QtnRibbonStylePrivate.h

PUBLIC_HEADERS += \
    $$PWD/QtnCommonStyle.h \
    $$PWD/QtnOfficeStyle.h \
    $$PWD/QtnRibbonStyle.h \
    $$PWD/QtnStyleHelpers.h \
    $$PWD/QtnPopupHelpers.h

WINDOWS_HEADERS +=
LINUX_HEADERS +=
MACOSX_HEADERS +=

WINDOWS_SOURCES += $$PWD/QtnCommonStyle_win.cpp
LINUX_SOURCES += $$PWD/QtnCommonStyle_linux.cpp
MACOSX_SOURCES += $$PWD/QtnCommonStyle_mac.mm

