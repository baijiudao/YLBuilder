//******   Creat by Lone King 2016-9-16   ******//

#ifndef MESSAGETRANSMIT_H
#define MESSAGETRANSMIT_H

#include "messagetransmit_global.h"
#include <QString>
#include <QMap>

class MESSAGETRANSMIT_EXPORT MessageTransmiter;

using Listener = QMap < QString, MessageTransmiter * >;

class MESSAGETRANSMIT_EXPORT MessageTransmiter
{
public:
    MessageTransmiter();
    ~MessageTransmiter();

    QString GetMoudleName();//��ȡģ������
    void SetMoudleName(QString moudleName);//����ģ������

    void installListener(MessageTransmiter *);//ע�����
    void unInstallListener();//ע������

    //������Ϣ,reciverMoudleNameΪ��ALL��ʱ��������ע��ģ�鷢����Ϣ
    void sendMessage(QString reciverMoudleName, void *pSender, int iMessageType, void* pData = NULL);

    //��Ϣ��Ӧ�����������ڼ̳�����ʵ��
    virtual void onMessage(void* pSender, int iMessageType, void* pData)
    {
    }

private:
    Listener * getListener();

public:
    QString m_moudleName;//ģ����

private:
    Listener m_listener;
};

#endif // MESSAGETRANSMIT_H
