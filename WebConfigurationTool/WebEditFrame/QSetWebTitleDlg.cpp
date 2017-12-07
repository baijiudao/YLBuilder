#include "qSetWebTitleDlg.h"

QSetWebTitleDlg::QSetWebTitleDlg(QWidget *parent)
	: QDialog(parent)
{
	m_TextContent = "";

	this->resize(250, 40);
	setWindowFlags(Qt::Dialog | Qt::WindowCloseButtonHint);
	m_pHLyt = new QHBoxLayout();
	m_pTitleLabel = new QLabel();
	m_pHLyt->addWidget(m_pTitleLabel);
	m_pTextEdit = new QLineEdit();
	m_pHLyt->addWidget(m_pTextEdit);
	m_pOKButton = new QPushButton();
	//m_pOKButton->setMaximumHeight(50);
	connect(m_pOKButton, &QPushButton::clicked, this, &QSetWebTitleDlg::onClickOKBtn);
	m_pHLyt->addWidget(m_pOKButton);

	setLayout(m_pHLyt);

	retranslate();
}

QSetWebTitleDlg::~QSetWebTitleDlg()
{
	delete m_pTitleLabel;
	delete m_pTextEdit;
	delete m_pOKButton;
	delete m_pHLyt;
}

void QSetWebTitleDlg::changeEvent(QEvent *evt)
{
	switch (evt->type())
	{
		case QEvent::LanguageChange:
			retranslate();
			break;
		default:
			break;
	}
	QDialog::changeEvent(evt);
}

void QSetWebTitleDlg::retranslate()
{
	setWindowTitle(qApp->translate(c_sSetWebTitleDlg, c_sSWTDlgTitle));
	m_pTitleLabel->setText(qApp->translate(c_sSetWebTitleDlg, c_sSWTDlgLabel));
	m_pOKButton->setText(qApp->translate(c_sSetWebTitleDlg, c_sSWTDlgOKBtn));
}

void QSetWebTitleDlg::onClickOKBtn()
{
	m_TextContent = m_pTextEdit->text();
	this->accept();
}

void QSetWebTitleDlg::setCurrentWebTitle(QString strCurrentWebTitle)
{
	m_pTextEdit->setText(strCurrentWebTitle);
}

QString QSetWebTitleDlg::getWebTitle()
{
	return m_TextContent;
}
