# Durum Senaryoları
Senaryolara e-döküman olarak ulaşmak için [buraya](https://docs.google.com/document/d/1Iifh3tHGo42Pt715XuE6zllCdX6pUSm51_mOvfwFndY/edit?usp=sharing) tıklayınız.
<br/><br/>

-----------------------------------------
| **Senaryo ID**     | U1 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Kullanıcı Girişi |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının sistemde kayıtlı olması |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı uygulamayı açar. <br/> **2.** Sistem, kullanıcıdan "kullanıcı adı" ve "şifre" bilgilerini girmesini ister. <br/> **3.** Kullanıcı gerekli bilgileri girer ve "Giriş Yap" butonuna tıklar. <br/> **4.** Sistem, giriş bilgilerini kontrol eder. <br/> **5.** Sistem kullanıcıyı "Giriş Yapılmış Durum" a geçirir ve ana sayfaya yönlendirir |
| **Genişlemeler**   ||
|| **2.a.** Girilen bilgiler gerekli kurallara uymuyorsa <br/> • Bilgiler kurallara uygun halde girilene kadar işlemlere devam edilemez <br/> **4.a.** Girilen bilgiler doğru değilse <br/> • Hatalı Bilgilerde yeniden girme şansı <br/> • Yeni üyelik oluşturma imkanı <br/> |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U2 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Kullanıcı Kayıt |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının sistemde kayıtlı olmaması |
| **Hedef Şartlar**  ||
|| • Kullanıcı sisteme kaydedilir |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı uygulamayı açar. <br/> **2.** Sistem, kullanıcıdan "kullanıcı adı" ve "şifre" gibi üyelik için gerekli bilgileri girmesini ister. <br/> **3.** Kullanıcı gerekli bilgileri girer ve "Kayıt Ol" butonuna tıklar. <br/> **4.** Sistem, girilen bilgilerini kontrol eder. <br/>  **5.**  Sistem kullanıcıyı kaydeder |
| **Genişlemeler**   ||
|| **2.a.** Girilen bilgiler gerekli kurallara uymuyorsa <br/> • Bilgiler kurallara uygun halde girilene kadar işlemlere devam edilemez <br/> **4.a.** Girilen bilgiler sistemde var olan bir kullanıcı ile eşleşiyorsa <br/> • Sistem bilgilerin yeniden girilmesini ister |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U3 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Kullanıcı Silme |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının sistemde kayıtlı olması |
| **Hedef Şartlar**  ||
|| • Kullanıcı sistemden silinir |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı uygulamayı açar. <br/> **2.** Hesap silme ekranına gider. <br/> **3.** Kullanıcı gerekli onaylamayı yapar. <br/> **4.** Sistem kullanıcının silme işlemini onayladığını kontrol eder <br/> **5.** Sistem kullanıcıyı siler |
| **Genişlemeler**   ||
|| **4.a.** Kullanıcın silme işlemini onaylamaması <br/> • Sistem uyarı verir. |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U4 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Türe Göre Film/Dizi Filtreleme |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının giriş yapılmış durumda olması |
| **Hedef Şartlar**  ||
|| • Aranan türe göre filtreleme yapılır |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı arama yapmak için film/dizi türü seçer. <br/> **2.** Sistem, kullanıcıdan seçilen tür bilgisini alır ve filtreleme yapar. <br/> **3.** Filtrelenen veriler listelenir. |
| **Genişlemeler**   ||
|| **3.a.** Filtrelenen kategoride film/dizi bulunmuyorsa <br/> • Önerilen film/dizi 'ler listelenir. |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U5 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Film/Dizi Arama |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının giriş yapılmış durumda olması |
| **Hedef Şartlar**  ||
|| • Aranan kelimeye göre filtreleme yapılır |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı arama yapmak için anahtar kelimeyi girer. <br/> **2.** Sistem, kullanıcıdan aranacak kelimeyi alır ve filtreleme yapar. <br/> **3.** Filtrelenen veriler listelenir. |
| **Genişlemeler**   ||
|| **3.a.** Aranan film/dizi filtrelenenler arasında yoksa <br/> • Öneri film/dizi 'ler listelenir |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U6 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Puanlama |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının giriş yapılmış durumda olması |
| **Hedef Şartlar**  ||
|| • Film/Dizi Basitçe Puanlanır |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı “Bana Göre Değil”, “Bunu Sevdim” ve “Buna Bayıldım” olmak üzere 3 farklı puanlama seçeneğinden birine tıklar <br/> **2.** Sistem, kullanıcının seçimini kontrol eder <br/> **3.** Sistem kullanıcın puanlamasını kaydeder |
| **Genişlemeler**   ||
|| **1.a.** Kullanıcının puanlamamış olması <br/> • Sistem puanlanma işlemine devam etmez |


-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U7 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Favoriler/Listem |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının giriş yapılmış durumda olması |
| **Hedef Şartlar**  ||
|| • Film/Dizi Favrori/Liste’ye eklenir |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı Favoriler/Listem ‘e eklemek istediği Film/Dizi için ekle butonuna tıklar <br/> **2.** Sistem, kullanıcının seçimini kontrol eder <br/> **3.** Sistem kullanıcının eklemek istediği Film/Dizi ‘yi Favoriler/Listem ‘e kaydeder |
| **Genişlemeler** ||
|| **2.a.** Seçim yapılmamış olması <br/> • Sistem işleme devam etmez |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | A1 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Admin Giriş |
| **Aktör**    | Admin |
| **Önkoşullar**  | Adminin sistemde kayıtlı olması |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Admin uygulamayı açar <br/> **2.** Sistem, adminden "kullanıcı adı" ve "şifre" bilgilerini girmesini ister. <br/> **3.** Admin gerekli bilgileri girer ve "Giriş Yap" butonuna tıklar. <br/> **4.** Sistem, giriş bilgilerini kontrol eder. <br/> **5.** Sistem adminin kayıtlı olduğunu doğrular ve admin panele yönlendirir |
| **Genişlemeler**   ||
|| **2.a.** Girilen bilgiler gerekli kurallara uymuyorsa <br/> • Bilgiler kurallara uygun halde girilene kadar işlemlere devam edilemez <br/> **5.a.** Sistem adminin kayıtlı olduğunu doğrulayamaz <br/> • Yetkisi olmadığını bilgisini verir. |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | A2 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Film/Dizi Ekleme |
| **Aktör**    | Admin |
| **Önkoşullar** | Adminin sisteme giriş yapmış durumda olması |
| **Hedef Şartlar**  ||
|| • Yeni film/dizi 'in sisteme eklenmesi |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Admin film/dizi ekleme sayfasına girer. <br/> **2.** Gerekli anları doldurur. <br/> **3.** Kaydetme işlemini onaylar <br/> **4.** Sistem girilen bilgileri kontrol eder <br/> **5.** Sistem kaydetme işlemini gerçekleştirir. |
| **Genişlemeler**   ||
|| **2.a.** Girilen bilgilerde zorunlu alanlar yoksa <br/> • Zorunlu bilgiler girilene kadar işlemlere devam edilemez <br/> **4.a.** Girilen bilgilerin eksik olması <br/> • Sistem eksik alanların doldurulmasını ister |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | A3 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Film/Dizi Bilgisi Düzenleme |
| **Aktör**    | Admin |
| **Önkoşullar** | Adminin sisteme giriş yapmış durumda olması |
| **Hedef Şartlar**  ||
|| • Var olan film/dizi 'in bilgilerinin güncellenmesi |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Admin güncellenecek film/dizi 'i seçer. <br/> **2.** Gerekli düzenlemeleri yapar. <br/> **3.** Kaydetme işlemini onaylar <br/> **4.** Sistem girilen bilgileri kontrol eder <br/> **5.** Sistem kaydetme işlemini gerçekleştirir. |
| **Genişlemeler**   ||
|| **2.a.** Girilen bilgilerde zorunlu alanlar yoksa <br/> • Zorunlu bilgiler girilene kadar işlemlere devam edilemez <br/> **4.a.** Girilen bilgilerin eksik olması <br/> • Sistem eksik bilgilerin girilmesini ister. |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | A4 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Film/Dizi Silme |
| **Aktör**    | Admin |
| **Önkoşullar** | Adminin sisteme giriş yapmış durumda olması |
| **Hedef Şartlar**  ||
|| • Var olan film/dizi 'in sistemden silinmesi |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Admin silinecek film/dizi 'i seçer. <br/> **2.** Admin silme işlemini onaylar <br/> **3.** Sistem seçimi kontrol eder <br/> **5.** Sistem silme işlemini gerçekleştirir. | 
| **Genişlemeler**   ||
|| **3.a.** Silme işleminin onaylanmaması <br/> • Sistem uyarı verir. |

-----------------------------------------

<br/>
<br/>
<br/>

[README'ye dön](../README.md) 
