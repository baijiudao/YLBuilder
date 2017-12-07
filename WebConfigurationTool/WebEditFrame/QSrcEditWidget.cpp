#include "QSrcEditWidget.h"
#include <QDebug>
QSrcEditWidget::QSrcEditWidget(QString filePath, QWidget *parent)
    : QWidget(parent)
	, m_filePath(filePath)
{
    m_pTextEdit = new QPlainTextEdit(this);
    m_pTextEdit->resize(this->size());
}

QSrcEditWidget::~QSrcEditWidget()
{

}

void QSrcEditWidget::resizeEvent(QResizeEvent *event)
{
    QWidget::resizeEvent(event);
    m_pTextEdit->resize(this->size().width() - 2, this->size().height() - 1);
}

void QSrcEditWidget::reloadSrc(QString filePath)
{
	if ("" == filePath)
	{
		m_pTextEdit->setPlainText("");
		return;
	}
	m_filePath = filePath;
    QFile file;
    file.setFileName(filePath);
    bool ok = file.open(QIODevice::ReadOnly);
    if (ok)
    {
        QTextStream in(&file);
        in.setCodec("UTF-8");
        QString str = in.readAll();
        m_pTextEdit->setPlainText(str);
        file.close();
    }
}

void QSrcEditWidget::quitAndSave(QString filePath, int state)
{
	if ("" == filePath)
	{
		return;
	}
    QString strtmp = m_pTextEdit->toPlainText();

    QFile file;
	file.setFileName(filePath);
	file.remove(filePath);
    bool ok = file.open(QIODevice::ReadWrite);
    if (ok)
    {
        QTextStream out(&file);
        out.setCodec("UTF-8");
        out << strtmp;
        out.flush();
        file.close();
    }
	emit saveWeb();
}

void QSrcEditWidget::showEvent(QShowEvent *event)
{
	//reloadSrc(m_filePath);
	QWidget::showEvent(event);
}