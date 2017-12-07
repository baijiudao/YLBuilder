#include "QWebViewWidget.h"

QWebViewWidget::QWebViewWidget(QString filePath, QWidget *parent)
    : QWidget(parent)
	, m_filePath(filePath)
	, m_pWebView(NULL)
{
    m_pWebView = new QWebEngineView(this);
	//TODO 设置之后有内存泄漏
 //   m_pWebView->hide();
    m_pWebView->setAcceptDrops(false);
	connect(m_pWebView, &QWebEngineView::loadFinished, this, &QWebViewWidget::loadUrlFinished);
}

QWebViewWidget::~QWebViewWidget()
{
	if (m_pWebView != NULL)
	{
		delete m_pWebView;
		m_pWebView = NULL;
	}
}

void QWebViewWidget::resizeEvent(QResizeEvent *event)
{
    QWidget::resizeEvent(event);
    m_pWebView->resize(this->size().width() - 2, this->size().height() - 1);
}

void QWebViewWidget::showEvent(QShowEvent *event)
{
//	loadUrl(m_filePath);
    QWidget::showEvent(event);
    m_pWebView->show();
}

void QWebViewWidget::hideEvent(QHideEvent *event)
{
    QWidget::hideEvent(event);
    m_pWebView->hide();
}

void QWebViewWidget::loadUrl(QString filePath)
{
	//TODO 加载之后又内存泄漏！！！？？
    m_pWebView->load(QUrl(filePath));
	m_filePath = filePath;
}

void QWebViewWidget::loadUrlFinished()
{
 	if (this->parentWidget()->parentWidget())
 	{
 		this->parentWidget()->parentWidget()->setEnabled(true);
 	}
}
