/****************************************************************************
**
** Qtitan Library by Developer Machines (Microsoft-Ribbon implementation for Qt.C++)
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

#ifndef QTN_RIBBONPAGE_DSGN_H
#define QTN_RIBBONPAGE_DSGN_H

#include <QtDesigner/QExtensionFactory>
#include <QDesignerCustomWidgetInterface>
#include <QtDesigner/QDesignerFormWindowInterface>

#include "QtnRibbonPage.h"

namespace Qtitan
{
    /* DsgnRibbonPagePlugin */
    class DsgnRibbonPagePlugin : public QObject, public QDesignerCustomWidgetInterface
    {
        Q_OBJECT
        Q_INTERFACES(QDesignerCustomWidgetInterface)
    public:
        DsgnRibbonPagePlugin(QObject* parent = 0);
    public:
        bool isContainer() const;
        bool isInitialized() const;
        QIcon icon() const;
        QString domXml() const;
        QString group() const;
        QString includeFile() const;
        QString name() const;
        QString toolTip() const;
        QString whatsThis() const;
        QWidget* createWidget(QWidget* parent);
        void initialize(QDesignerFormEditorInterface* core);

    private Q_SLOTS:
        void titleChanged(const QString& title);
    private:
        bool initialized;
        QDesignerFormEditorInterface* m_core;
    };

    /* RibbonPageEventFilterDsgn */
    class RibbonPageEventFilterDsgn: public QObject
    {
        Q_OBJECT
    public:
        explicit RibbonPageEventFilterDsgn(RibbonPage* page);
        virtual ~RibbonPageEventFilterDsgn();
    protected:
        QDesignerFormWindowInterface* formWindow() const;
    private Q_SLOTS:
        void slotAddNewRibbonGroup();
        void slotRemoveCurrentPage();
    private:
        virtual bool eventFilter(QObject* watched, QEvent* event);
        bool handleContextMenuEvent(QContextMenuEvent* event);
    private:
        RibbonPage* m_pRibbonPage;
        QAction* m_addRibbonGroup;
        QAction* m_deleteRibbonGroup;
    };


}; //namespace Qtitan

#endif //QTN_RIBBONPAGE_DSGN_H
