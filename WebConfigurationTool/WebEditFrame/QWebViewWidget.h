#ifndef QWEBVIEWWIDGET_H
#define QWEBVIEWWIDGET_H

#include <QWidget>
#include <QtWebEngineWidgets>

class QWebViewWidget : public QWidget
{
    Q_OBJECT

public:
    QWebViewWidget(QString filePath, QWidget *parent = NULL);
    virtual ~QWebViewWidget();

private:
    
protected:
    QWebEngineView *m_pWebView;

protected:
    virtual void showEvent(QShowEvent *event);
    virtual void hideEvent(QHideEvent *event);
    virtual void resizeEvent(QResizeEvent *event);
signals:
	void saveWeb();

public slots:
	void loadUrlFinished();

public:
    void loadUrl(QString filePath);
	QString m_filePath;
};

#endif // QWEBVIEWWIDGET_H
