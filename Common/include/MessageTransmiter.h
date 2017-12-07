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

    QString GetMoudleName();//获取模块名称
    void SetMoudleName(QString moudleName);//设置模块名称

    void installListener(MessageTransmiter *);//注册监听
    void unInstallListener();//注销监听

    //发送消息,reciverMoudleName为“ALL”时，给所有注册模块发送消息
    void sendMessage(QString reciverMoudleName, void *pSender, int iMessageType, void* pData = NULL);

    //消息响应函数，具体在继承类中实现
    virtual void onMessage(void* pSender, int iMessageType, void* pData)
    {
    }

private:
    Listener * getListener();

public:
    QString m_moudleName;//模块名

private:
    Listener m_listener;
};

#endif // MESSAGETRANSMIT_H
