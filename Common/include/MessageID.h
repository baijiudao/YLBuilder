#define USER_MESSAGE 0x80000                            //�û��Զ�����Ϣ
#define MESSAGE_LANGUAGE_ZH USER_MESSAGE + 0xFFFF       //����
#define MESSAGE_LANGUAGE_EN USER_MESSAGE + 0xFFFE       //Ӣ��
/*
#define OPENWEBEDIT USER_MESSAGE + 0x0001               //����̬����Web�༭��
#define OPENPICEDIT USER_MESSAGE + 0x0002               //����̬����Pic�༭��*/

#define OPENWEBEDIT USER_MESSAGE + 0x0028               //����̬����Web�༭��
#define OPENWEBFILEEDIT USER_MESSAGE + 0x0029           //����̬����Pic�༭��*/
#define OPENPICSTOREDIT USER_MESSAGE + 0x002A           //����̬����Web�༭��
#define OPENPICEDIT USER_MESSAGE + 0x002B               //����̬����Pic�༭��*/

//Web�༭����Ϣ
#define ENABLEDRAG USER_MESSAGE + 0x0003                //�򿪴��������ק״̬
#define DISABLEDRAG USER_MESSAGE + 0x0004               //�رմ��������ק״̬
#define REFRESHTABPAGE USER_MESSAGE + 0x0005            //ˢ��tabҳ��
#define MESSAGESAVEWEBFILE USER_MESSAGE + 0x000E        //����WEBҳ��
#define WEBEDITPAGEENABLE USER_MESSAGE + 0x000F         //ֻ���ڱ༭��ҳ�Ĵ����£���ҳ�༭�������ϵİ�ť���ڿɵ��״̬
#define WEBMESSAGE_SELECTEALL USER_MESSAGE + 0x0010     //ȫѡ��Ϣ
#define WEBMESSAGE_COPY USER_MESSAGE + 0x0011			//������Ϣ
#define WEBMESSAGE_PASTE USER_MESSAGE + 0x0012			//ճ����Ϣ
#define WEBMESSAGE_DELETE USER_MESSAGE + 0x0013			//ɾ����Ϣ
#define WEBMESSAGE_UNDO USER_MESSAGE + 0x0014			//������Ϣ
#define WEBMESSAGE_REDO USER_MESSAGE + 0x0015			//������Ϣ
#define WEBMESSAGE_ALIGNTOP USER_MESSAGE + 0x0016		//�϶�����Ϣ
#define WEBMESSAGE_ALIGNBOTTOM USER_MESSAGE + 0x0017	//�¶�����Ϣ
#define WEBMESSAGE_ALIGNLEFT USER_MESSAGE + 0x0018		//�������Ϣ
#define WEBMESSAGE_ALIGNRIGHT USER_MESSAGE + 0x0019		//�Ҷ�����Ϣ
#define WEBMESSAGE_ALIGNHORIZONTAL USER_MESSAGE + 0x001A//ˮƽ������Ϣ
#define WEBMESSAGE_ALIGNVERTICAL USER_MESSAGE + 0x001B	//��ֱ������Ϣ
#define WEBMESSAGE_EQUHORIZONTAL USER_MESSAGE + 0x001C	//ˮƽ�ȼ����Ϣ
#define WEBMESSAGE_EQUVERTICAL USER_MESSAGE + 0x001D	//��ֱ�ȼ����Ϣ
#define WEBMESSAGE_SAMEWIDTH USER_MESSAGE + 0x001E		//�ȿ���Ϣ
#define WEBMESSAGE_SAMEHEIGHT USER_MESSAGE + 0x001F		//�ȸ���Ϣ
#define WEBMESSAGE_SAMESIZE USER_MESSAGE + 0x0020		//�ȴ�С��Ϣ
#define WEBMESSAGE_SETWEBTITLE USER_MESSAGE + 0x0021	//������ҳ��������Ϣ
#define WEBMESSAGE_SETWEBSIZE USER_MESSAGE + 0x0022		//������ҳ��С��Ϣ
#define WEBMESSAGE_SETUNDOENABLE USER_MESSAGE + 0x0023	//���ó�����ť�һ�״̬
#define WEBMESSAGE_SETREDOENABLE USER_MESSAGE + 0x0024	//����������ť�һ�״̬
#define WEBMESSAGE_ZOOMNORMAL USER_MESSAGE + 0x0025		//������С
#define WEBMESSAGE_ZOOMIN USER_MESSAGE + 0x0026			//�Ŵ�
#define WEBMESSAGE_ZOOMOUT USER_MESSAGE + 0x0027		//��С

#define  WEBMESSAGE_SENDSVGPATH USER_MESSAGE + 0X0028  //����svg·����ǰ��


//ͼƬ�༭����Ϣ
#define MESSAGE_DRAW_SELECT    USER_MESSAGE + 0x0006    //�滭����ѡ��
#define MESSAGE_DRAW_LINE      USER_MESSAGE + 0x0007    //�滭����ѡ��
#define MESSAGE_DRAW_RECTANGLE USER_MESSAGE + 0x0008    //�滭����ѡ��
#define MESSAGE_DRAW_ELLIPSE   USER_MESSAGE + 0x0009    //�滭����ѡ��
#define MESSAGE_DRAW_ROURECT   USER_MESSAGE + 0x000a    //�滭����ѡ��
#define MESSAGE_DRAW_POLYGON   USER_MESSAGE + 0x000b    //�滭����ѡ��
#define MESSAGE_DRAW_TEXT      USER_MESSAGE + 0x000c    //�滭����ѡ��
#define MESSAGE_DRAW_PICTURE   USER_MESSAGE + 0x000d    //�滭����ѡ��

//
#define PROJECT_CURRENT_PAGE     USER_MESSAGE + 0x0040   
#define WEBMESSAGE_GETIMAGEPATH  USER_MESSAGE + 0X0041
#define WEBMESSAGE_PROJECT_PATH  USER_MESSAGE + 0X0042
#define IMAGEPATH_TO_PROJECT     USER_MESSAGE + 0X0043
#define  SAVE_AS_HTML            USER_MESSAGE + 0X0044

