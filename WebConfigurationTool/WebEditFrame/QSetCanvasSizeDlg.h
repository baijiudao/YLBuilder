#ifndef QSETCANVASSIZEDLG_H
#define QSETCANVASSIZEDLG_H

#include "Include.h"
#include <QApplication>
#include <QDialog>
#include <QEvent>
#include <QGridLayout>
#include <QLabel>
#include <QLineEdit>
#include <QPushButton>
#include <QIntValidator>

class QSetCanvasSizeDlg : public QDialog
{
	Q_OBJECT

public:
	QSetCanvasSizeDlg(QWidget *parent);
	~QSetCanvasSizeDlg();

private:
	QString m_strWidth;
	QString m_strHeight;

	QLabel *m_pLabWidth, *m_pLabHeight;
	QLineEdit *m_pEditWidth, *m_pEditHeight;
	QPushButton *m_pBtnOK;

protected:
	void changeEvent(QEvent *evt);
	void retranslate();
	
public slots:
	void onClickOKBtn();

public:
	void setCurrentWebSize(QString);
	QString getWebWidth();
	QString getWebHeight();
};

#endif // QSETCANVASSIZEDLG_H
