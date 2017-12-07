/****************************************Copyright (c)****************************************************
**
**                                       D.H. InfoTech
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  CreateProjectDialog.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/4/10
** Descriptions:               END
** 
*********************************************************************************************************/
#include "CreateProjectDialog.h"
#include <QFileDialog>
#include <QMessageBox>
#include "Markup.h"
#include "qapplication.h"
CreateProjectDialog::CreateProjectDialog(QWidget *parent)
	: QDialog(parent)
	, m_choosePath("")
	, m_pProjectNameLabel(NULL)
	, m_pPathLabel(NULL)
	, m_pProjectNameLineEdit(NULL)
	, m_pPathLineEdit(NULL)
	, m_pChoosePathBtn(NULL)
	, m_pOKBtn(NULL)
	, m_pCancelBtn(NULL)
{
	init();
	retranslate();
}

CreateProjectDialog::~CreateProjectDialog()
{
}

/**
 * @brief:初始化界面
 */
void CreateProjectDialog::init()
{
	QVBoxLayout *ver = new QVBoxLayout(this);
	m_pProjectNameLabel = new QLabel(this);
	m_pProjectNameLineEdit = new QLineEdit(this);

	m_pPathLabel = new QLabel;
	m_pPathLineEdit = new QLineEdit(this);
	m_pPathLineEdit->setEnabled(false);

	m_pChoosePathBtn = new QPushButton(this);
	
	QVBoxLayout *ver1 = new QVBoxLayout(this);
	ver1->addWidget(m_pProjectNameLabel);
	ver1->addWidget(m_pPathLabel);
	ver1->setSpacing(20);

	QVBoxLayout *ver2 = new QVBoxLayout(this);
	ver2->addWidget(m_pProjectNameLineEdit);
	ver2->addWidget(m_pPathLineEdit);
	ver2->setSpacing(20);

	QVBoxLayout *ver3 = new QVBoxLayout(this);
	ver3->addStretch();
	ver3->addWidget(m_pChoosePathBtn);
	ver3->setSpacing(20);

	QHBoxLayout *hor = new QHBoxLayout(this);

	hor->addLayout(ver1);
	hor->addLayout(ver2);
	hor->addLayout(ver3);
	hor->setContentsMargins(5, 20, 5, 20);

	QHBoxLayout *hor3 = new QHBoxLayout(this);
	m_pOKBtn = new QPushButton(this);
	m_pCancelBtn = new QPushButton(this);
	hor3->addStretch();
	hor3->addWidget(m_pOKBtn);
	hor3->addWidget(m_pCancelBtn);

	ver->addLayout(hor);
	ver->addStretch(3);
	ver->addLayout(hor3);
	ver->addStretch(1);
	setLayout(ver);
	resize(QSize(400,200));

	connect(m_pChoosePathBtn, &QPushButton::clicked, 
		this, &CreateProjectDialog::on_choosePathPushButton_clicked);
	connect(m_pCancelBtn, &QPushButton::clicked, 
		this, &CreateProjectDialog::on_pushButtonCancel_clicked);
}

/**        
 * @brief: 处理创建项目文件确认按钮逻辑
 */
bool CreateProjectDialog::getPathAndNameState()
{
	//codereview 路径正确性判定,项目名称长度等合规判定
	if (m_pProjectNameLineEdit->text().isEmpty())
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning)
			, qApp->translate(c_sCreateProjectDlg, c_sProjectNameWarning));
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return false;
	}
	QString pattern(PATTEN_TYPE);
	QRegExp rx(pattern);
	int match = m_pProjectNameLineEdit->text().indexOf(rx);
	if (match >= 0)
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning)
			, qApp->translate(c_sCreateProjectDlg, c_sProjectNameErroWarning) + "\n /:|*?\"<>");
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return false;
	}
	if (m_pPathLineEdit->text().isEmpty())
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning)
			, qApp->translate(c_sCreateProjectDlg, c_sProjectPathWarning));
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return false;
	}
	hide();
	return true;
}

/**        
 * @brief:取消/关闭      
 */
void CreateProjectDialog::on_pushButtonCancel_clicked()
{
	hide();
}

/**        
 * @brief: 打开路径选择窗口    
 */
void CreateProjectDialog::on_choosePathPushButton_clicked()
{
	//codereview 测试一下中文路径
	QString newPath = QFileDialog::getExistingDirectory(NULL, "", 
		"C:/", QFileDialog::ShowDirsOnly);
	if (newPath.isEmpty())
	{
		return;
	}
	m_choosePath = newPath;
	m_pPathLineEdit->setText(newPath);
}

/**        
 * @brief:        
 * @param[in]: Path工程路径
 * @param[in]: Name工程名称
 */
void CreateProjectDialog::getPathAndName(QString &path, QString &name)
{
	name = m_pProjectNameLineEdit->text();
	path = m_pPathLineEdit->text();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void CreateProjectDialog::changeEvent(QEvent *evt)
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

/**        
 * @brief: 翻译    
 */
void CreateProjectDialog::retranslate()
{
	setWindowTitle(qApp->translate(c_sCreateProjectDlg, c_sCreateProjectDlgTitle));
	m_pProjectNameLabel->setText(qApp->translate(c_sCreateProjectDlg, c_sProjectNameLabel));
	m_pPathLabel->setText(qApp->translate(c_sCreateProjectDlg, c_sPathLabel));
	m_pChoosePathBtn->setText(qApp->translate(c_sCreateProjectDlg, c_sChoosePathBtn));
	m_pOKBtn->setText(qApp->translate(c_sCreateProjectDlg, c_sOKBtn));
	m_pCancelBtn->setText(qApp->translate(c_sCreateProjectDlg, c_sCancelBtn));
}

void CreateProjectDialog::showEvent(QShowEvent *e)
{
	m_pProjectNameLineEdit->setText("");
	m_pPathLineEdit->setText("C:/");
}