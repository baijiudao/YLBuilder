#include "qSetCanvasSizeDlg.h"

QSetCanvasSizeDlg::QSetCanvasSizeDlg(QWidget *parent)
	: QDialog(parent)
{
	m_strWidth = "";
	m_strHeight = "";

	this->resize(250, 80);
	setWindowFlags(Qt::Dialog | Qt::WindowCloseButtonHint);

	m_pLabWidth = new QLabel;
	m_pLabHeight = new QLabel;
	m_pEditWidth = new QLineEdit;
	m_pEditWidth->setValidator(new QIntValidator(1, 99999, m_pEditWidth));
	m_pEditHeight = new QLineEdit;
	m_pEditHeight->setValidator(new QIntValidator(1, 99999, m_pEditHeight));
	m_pBtnOK = new QPushButton;
	connect(m_pBtnOK, &QPushButton::clicked, this, &QSetCanvasSizeDlg::onClickOKBtn);

	QGridLayout *pGridLyt = new QGridLayout;
	pGridLyt->addWidget(m_pLabWidth, 0, 0);
	pGridLyt->addWidget(m_pEditWidth, 0, 1);
	pGridLyt->addWidget(m_pLabHeight, 1, 0);
	pGridLyt->addWidget(m_pEditHeight, 1, 1);
	pGridLyt->addWidget(m_pBtnOK, 1, 2);
	setLayout(pGridLyt);

	/*m_HLytWidth.addWidget(&m_pLabWidth);
	m_HLytWidth.addWidget(&m_pEditWidth);
	m_HLytWidth.addStretch();

	m_HLytHeight.addWidget(&m_pLabHeight);
	m_HLytHeight.addWidget(&m_pEditHeight);
	m_HLytHeight.addWidget(&m_pBtnOK);
	connect(&m_pBtnOK, &QPushButton::clicked, this, &QSetCanvasSizeDlg::onClickOKBtn);

	m_VLyt.addLayout(&m_HLytWidth);
	m_VLyt.addLayout(&m_HLytHeight);
	setLayout(&m_VLyt);*/

	retranslate();
}

QSetCanvasSizeDlg::~QSetCanvasSizeDlg()
{
	delete m_pLabWidth;
	delete m_pLabHeight;
	delete m_pEditWidth;
	delete m_pEditHeight;
	delete m_pBtnOK;
}

void QSetCanvasSizeDlg::changeEvent(QEvent *evt)
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

void QSetCanvasSizeDlg::retranslate()
{
	setWindowTitle(qApp->translate(c_sSetCanvasSizeDlg, c_sSCSDlgTitle));
	m_pLabWidth->setText(qApp->translate(c_sSetCanvasSizeDlg, c_sSCSDlgLabelWidth));
	m_pLabHeight->setText(qApp->translate(c_sSetCanvasSizeDlg, c_sSCSDlgLabelHeight));
	m_pBtnOK->setText(qApp->translate(c_sSetCanvasSizeDlg, c_sSCSDlgOKBtn));
}

void QSetCanvasSizeDlg::setCurrentWebSize(QString strSize)
{
	m_strWidth = strSize.mid(0, strSize.indexOf(','));
	m_pEditWidth->setText(m_strWidth);
	m_strHeight = strSize.mid(strSize.indexOf(',') + 1, strSize.length());
	m_pEditHeight->setText(m_strHeight);
}

QString QSetCanvasSizeDlg::getWebWidth()
{
	return m_strWidth;
}

QString QSetCanvasSizeDlg::getWebHeight()
{
	return m_strHeight;
}

void QSetCanvasSizeDlg::onClickOKBtn()
{
	if (m_pEditWidth->text().toInt() < 1 || m_pEditHeight->text().toInt() < 1)
	{
		return;
	}

	m_strWidth = m_pEditWidth->text();
	m_strHeight = m_pEditHeight->text();

	this->accept();
}
