#ifndef QSETWEBTITLEDLG_H
#define QSETWEBTITLEDLG_H

#include "Include.h"
#include <QApplication>
#include <QDialog>
#include <QEvent>
#include <QHBoxLayout>
#include <QLabel>
#include <QLineEdit>
#include <QPushButton>

class QSetWebTitleDlg : public QDialog//, public MessageTransmiter
{
	Q_OBJECT

public:
	QSetWebTitleDlg(QWidget *parent);
	~QSetWebTitleDlg();

private:
	QHBoxLayout *m_pHLyt;
	QLabel *m_pTitleLabel;
	QLineEdit *m_pTextEdit;
	QPushButton *m_pOKButton;

	QString m_TextContent;
	
protected:
	void changeEvent(QEvent *evt);
	void retranslate();

public slots:
	void onClickOKBtn();

public:
	void setCurrentWebTitle(QString);
	QString getWebTitle();
};

#endif // QSETWEBTITLEDLG_H
