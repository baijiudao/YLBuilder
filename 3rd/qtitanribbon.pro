TEMPLATE = subdirs

include(src/shared/platform.pri)

CONFIG += ordered

QTN_BUILD_SOURCE = 0
QTN_COMPONENT_VERSION = $$fromfile($$PWD/src/ribbon/ribbon.pri, QTN_COMPONENT_VERSION)

exists($$PWD/src/shared/ribbon/ribbon.pro) {
    !isEmpty(QTN_COMPONENT_VERSION):QTN_BUILD_SOURCE = 1
}

equals(QTN_BUILD_SOURCE, 1) {
    message(QtitanRibbon source code building preparing....)
    SUBDIRS = src/shared/ribbon \
              src/ribbondsgn
}

SUBDIRS += \
          demos/ribbon/ribboncontrols \
          demos/ribbon/ribbonmdi \
          demos/ribbon/ribbonsample \
          demos/ribbon/ribbongalleries \
          demos/ribbon/ribbonbackstage \
          demos/ribbon/ribbonsystemmenu \
          demos/styles/guioffice \
          demos/styles/popupwindow \
          demos/styles/widgets

exists($$PWD/doc/qdocs.pri) {
    include($$PWD/doc/qdocs.pri)
}
