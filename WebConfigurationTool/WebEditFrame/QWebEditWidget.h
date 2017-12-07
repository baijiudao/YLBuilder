#ifndef QWEBEDITWIDGET_H
#define QWEBEDITWIDGET_H

#include <QWidget>
#include "QWebEngineEditView.h"
#include "Markup.h"

class QWebEditWidget : public QWidget
{
    Q_OBJECT

public:
	QWebEditWidget(QString filePath, QWidget *parent = NULL);
    virtual ~QWebEditWidget();
	void addEditJs(QString filePath);


private:
	void loadEditFileNames();
//	void addEditJs(QString filePath);

public:
    QWebEngineEditView *m_pWebEditView;
    
protected:
    virtual void showEvent(QShowEvent *event);
    virtual void hideEvent(QHideEvent *event);
    virtual void moveEvent(QMoveEvent *event);
    virtual void resizeEvent(QResizeEvent *event);
    virtual bool eventFilter(QObject *watched, QEvent *event);

public:
	void setCurrentPath(QString currentPath);
    void loadUrl(QString filePath);
	void quitAndSave(QString filePath, int state);

private:
	QString m_filePath;
	QString m_strCurrentPath;
	QList<QString> m_editJsFiles;
};

#endif // QWEBEDITWIDGET_H
