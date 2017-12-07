/****************************************************************************
**
** Qtitan Library by Developer Machines (Advanced AboutDialog for Qt)
** 
** Copyright (c) 2009-2015 Developer Machines (http://www.devmachines.com)
**           ALL RIGHTS RESERVED
** 
**  The entire contents of this file is protected by copyright law and
**  international treaties. Unauthorized reproduction, reverse-engineering
**  and distribution of all or any portion of the code contained in this
**  file is strictly prohibited and may result in severe civil and 
**  criminal penalties and will be prosecuted to the maximum extent 
**  possible under the law.
**
**  RESTRICTIONS
**
**  THE SOURCE CODE CONTAINED WITHIN THIS FILE AND ALL RELATED
**  FILES OR ANY PORTION OF ITS CONTENTS SHALL AT NO TIME BE
**  COPIED, TRANSFERRED, SOLD, DISTRIBUTED, OR OTHERWISE MADE
**  AVAILABLE TO OTHER INDIVIDUALS WITHOUT WRITTEN CONSENT
**  AND PERMISSION FROM DEVELOPER MACHINES
**
**  CONSULT THE END USER LICENSE AGREEMENT FOR INFORMATION ON
**  ADDITIONAL RESTRICTIONS.
**
****************************************************************************/
#include "aboutdialog.h"

QTITAN_USE_NAMESPACE

AboutDialog::AboutDialog(QWidget* parent)
    : QMessageBox(parent)
{
}

AboutDialog::AboutDialog(Icon icon, const QString& title, const QString& text, 
                       StandardButtons buttons, QWidget* parent, Qt::WindowFlags f)
    : QMessageBox(icon, title, text, buttons, parent, f)
{
}

AboutDialog::~AboutDialog()
{
}

void AboutDialog::show(QWidget* parent, const QString& title, const QString& component, const QString& version)
{
    QString translatedTextAboutQtnCaption;
    translatedTextAboutQtnCaption = QMessageBox::tr(
		"<h3>%1</h3>"
		"<p3>%2</p3>"
        "<p><br><br><br><br>%3</p>"
		).arg(qApp->translate(c_sMainFrame, c_sMainFrameTitle)).arg(qApp->translate(c_sMainFrame, c_sMainFrameModuleName)).arg(
		qApp->translate(c_sAbout, c_sAboutIntroduction));

    QString translatedTextAboutQtText;
    translatedTextAboutQtText = QMessageBox::tr(
        "<p>%1</p>"
		).arg(qApp->translate(c_sAbout, c_sAboutCopyright));

    AboutDialog* msgBox = new AboutDialog(parent);

	msgBox->setAttribute(Qt::WA_DeleteOnClose);
	msgBox->setWindowTitle(qApp->translate(c_sAbout, c_sAboutTitle));
	msgBox->setText(translatedTextAboutQtnCaption);
	msgBox->setInformativeText(translatedTextAboutQtText);

    QPixmap pm(QLatin1String(":/YLBuilderMainWindow/YLBuilder.ico"));
    if (!pm.isNull())
        msgBox->setIconPixmap(pm);

    msgBox->exec();
}
