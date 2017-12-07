
QTITANDIR = $$quote($$(QTITANDIR))

include($$PWD/platform.pri)

QTITAN_LIB_PATH = $$QTITANDIR/lib$$QTITAN_LIB_PREFIX
contains(QMAKE_HOST.arch, x86_64) {
    QTITAN_LIB_PATH = $$QTITAN_LIB_PATH/X64
}

INCLUDEPATH += $$PWD/../../include

win32-msvc|win32-msvc.net|win32-msvc2002|win32-msvc2003|win32-msvc2005|win32-msvc2008|win32-msvc2010|win32-msvc2012 {

    CONFIG(debug, debug|release):LIBS += $$QTITAN_LIB_PATH/qtnchartd2.lib
        else:LIBS += $$QTITAN_LIB_PATH/qtnchart2.lib
}

win32-g++ {

    LIBS += -L$$QTITAN_LIB_PATH

    CONFIG(debug, debug|release):LIBS += -lqtnchartd2
        else:LIBS += -lqtnchart2
}

unix {

    LIBS += -L$$QTITAN_LIB_PATH

    CONFIG(debug, debug|release):LIBS += -lqtnchartd
        else:LIBS += -lqtnchart
}

!lessThan(QT_VER_MAJ, 5) {
  QT += widgets
}
