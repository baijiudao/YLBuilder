#ifndef PICBASETABWIDGET_H
#define PICBASETABWIDGET_H

#include <QTabWidget>

static const char *c_sPicTabWidget = "BaseTabWidget";
static const char *c_sPicCloseTable = QT_TRANSLATE_NOOP("BaseTabWidget", "Close");
static const char *c_sPicSave = QT_TRANSLATE_NOOP("BaseTabWidget", "Save");
static const char *c_sPicSaveAs = QT_TRANSLATE_NOOP("BaseTabWidget", "Save As");

class PicBaseTabWidget : public QTabWidget//, public MessageTransmiter
{
	Q_OBJECT

public:
    PicBaseTabWidget(QString filePath, QWidget *parent = 0);
    ~PicBaseTabWidget();

private slots:
    //void slotCloseTab(int index);
    void slotCustomContextMenuRequested(const QPoint & pos);
    void slotClosePic();
    void slotSavePic();
    void slotSaveAsPic();
Q_SIGNALS:
    void signalSavePic();
    void signalSaveAsPic();
private:

};

#endif