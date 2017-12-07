#ifndef QSRCEDITWIDGET_H
#define QSRCEDITWIDGET_H

#include <windows.h>
#include <QWidget>
#include <QPlainTextEdit>
#include <QDir>
#include <QFile>
#include <QTextStream>
#include "MoudleName.h"
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"

#define SAVEWEBFILE 1

class QSrcEditWidget : public QWidget, public MessageTransmiter
{
    Q_OBJECT

public:
	QSrcEditWidget(QString filePath, QWidget *parent = NULL);
    virtual ~QSrcEditWidget();

private:
	void showEvent(QShowEvent *event) Q_DECL_OVERRIDE;
protected:
    QPlainTextEdit *m_pTextEdit;

signals:
	void saveWeb();
protected:
    virtual void resizeEvent(QResizeEvent *event);
public slots :
	void reloadSrc(QString filePath);
public:
	void quitAndSave(QString filePath, int state);
private:
	QString m_filePath;
    
};

#endif // QSRCEDITWIDGET_H
