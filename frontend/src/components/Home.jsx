import React, { useEffect, useState } from 'react'

import Tv from '../images/tv.gif'
import Phone from '../images/mobile.gif'
import Decive from '../images/device-gif.gif'
import Kids from '../images/kids.png'
import Navbar from './Navbar'
import InputComp from './InputComp'
import { useNavigate } from 'react-router-dom'

import MovieDataService from '../services/MovieDataService'

const Home = () => {

  const navigate = useNavigate();

  const [infCtrl, setIfCtrl] = useState(0);

  const [mail, setMail] = useState("");
  const [mailCtrl, setMailCtrl] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    MovieDataService.getAllUsers()
      .then(response => {
        setAllUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const openInf = (e) => {
    if (e !== infCtrl) {
      setIfCtrl(e);
    } else {
      setIfCtrl(0);
    }
  }

  const signUpPage = () => {
    const foundUser = allUsers.find(user => user.email === mail);
    if (foundUser) {
      alert('Bu e-posta adresi zaten kullanımda. Giriş sayfasına yönlendiriliyorsunuz.')
      navigate('/login');
    } else {
      navigate('/signup', { state: { mail: mail } });
    }
  }

  return (
    <div className='page d-flex col-12 flex-column gap-2 justify-content-center align-items-center'>

      <div id='home-start' className='d-flex flex-column col-12'>

        <Navbar />

        <div id='home-start1' className='col-12 d-flex flex-column gap-2 justify-content-center align-items-center'>
          <div className='d-flex flex-column gap-2 justify-content-center align-items-center'>
            <h2>Âlâsı var!</h2>
            <p>En iyi dizi, film, belgesel ve çok daha fazlası burada.</p>
            <p>İzlemeye hazır mısınız? Üye olmak ya da hesabınıza tekrar ulaşmak için tek yapmanız
              gereken e-posta adresinizi girmek.</p>
          </div>
          <div className='d-flex float-left gap-2'>
            <InputComp setMailHome={setMail} setMailCtrl={setMailCtrl} isValidEmail={isValidEmail} setIsValidEmail={setIsValidEmail}/>
            <button type='button' className='btn-start' onClick={() => signUpPage()}>Başlayın ›</button>
          </div>
        </div>

      </div>

      <div id='home-inf' className='col-12 home-inf1 d-flex flex-column gap-2 justify-content-center align-items-center'>
        <div className='d-flex flex-wrap col-12 gap-5 justify-content-center align-items-center'>
          <div className='col-5'>
            <h2>Telefonunuzda izleyin</h2>
            <p>Akıllı TV, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray oynatıcılar ve daha fazlasında seyredin.</p>
          </div>
          <div className='home-inf-img d-flex align-items-center justify-content-center'>
            <img alt='device' src={Tv} />
          </div>
        </div>
      </div>

      <div id='home-inf' className='col-12 home-inf2 d-flex flex-column gap-2 justify-content-center align-items-center'>
        <div className='d-flex flex-wrap gap-2 col-12 justify-content-center align-items-center'>
          <div className='home-inf-img d-flex align-items-center justify-content-center'>
            <img alt='mobile' src={Phone} />
          </div>
          <div className='col-5'>
            <h2>Çevrimdışı izlemek için içerikleri indirin</h2>
            <p>En sevdiğiniz içerikleri kolayca kaydedin ve her zaman izleyecek bir şeyleriniz olsun.</p>
          </div>
        </div>
      </div>

      <div id='home-inf' className='col-12 home-inf3 d-flex flex-column gap-2 justify-content-center align-items-center'>
        <div className=' d-flex flex-wrap gap-2 col-12 justify-content-center align-items-center'>
          <div className='col-5'>
            <h2>İstediğiniz her yerde izleyin</h2>
            <p>Telefonda, tablette, bilgisayarda, televizyonda sınırsız film ve dizi izleyin.</p>
          </div>
          <div className='home-inf-img d-flex align-items-center justify-content-center'>
            <img alt='device' src={Decive} />
          </div>
        </div>
      </div>

      <div id='home-inf' className='col-12 home-inf4 d-flex flex-column gap-2 justify-content-center align-items-center'>
        <div className='d-flex flex-wrap gap-2 col-12 justify-content-center align-items-center'>
          <div className='home-inf-img d-flex align-items-center justify-content-center'>
            <img alt='kids' src={Kids} />
          </div>
          <div className='col-5'>
            <h2>Çocuklarınız için profiller oluşturun</h2>
            <p>Üyeliğinize dâhil olan bu ücretsiz deneyim sayesinde çocuklarınız, sadece onlara özel bir alanda en sevdikleri karakterlerle maceralara atılabilir.</p>
          </div>
        </div>
      </div>

      <div id='home-inf' className='home-inf5 col-12 d-flex flex-column gap-2 justify-content-center align-items-center'>
        <div className='col-12 d-flex flex-column gap-2 col-12 justify-content-center align-items-center'>
          <h2>Sıkça Sorulan Sorular</h2>
          <div className='col-7 d-flex flex-column gap-2'>

            <div className='d-flex flex-column col-12 gap-1'>
              <div onClick={() => openInf(1)} className='ques ques-name d-flex col-12 float-left align-items center justify-content-between'>
                <div>Netflix nedir?</div>
                <div className='ques-plus' >+</div>
              </div>
              {infCtrl === 1 ? (
                <div id='net-inf' className='ques d-flex col-12 float-left align-items center justify-content-between'>
                  <div>Netflix; internet bağlantılı binlerce cihazda ödüllü diziler, filmler, animeler, belgeseller ve daha fazlasını içeren geniş bir arşiv sunan bir streaming hizmetidir.
                    <br /><br />Tek bir reklam olmadan, istediğiniz kadar, istediğiniz zaman izleyebilirsiniz - hepsi aylık düşük bir ücret karşılığında. Her zaman keşfedilecek yeni bir şeyler var, üstelik her hafta yeni diziler ve filmler ekleniyor!</div>
                </div>
              ) : (<></>)
              }
            </div>

            <div className='d-flex flex-column col-12 gap-1'>
              <div onClick={() => openInf(2)} className='ques ques-name d-flex col-12 float-left align-items center justify-content-between'>
                <div>Netflix'in maliyeti nedir?</div>
                <div className='ques-plus' >+</div>
              </div>
              {infCtrl === 2 ? (
                <div id='net-cost' className='ques d-flex col-12 float-left align-items center justify-content-between'>
                  <div>Netflix'i akıllı telefonunuz, tabletiniz, Akıllı TV'niz, dizüstü bilgisayarınız veya yayın cihazınızda sabit bir aylık ücretle izleyin. Aylık plan ücretleri 229,99 TL ile 119,99 TL arasında değişmektedir. Ekstra maliyet yok, sözleşme yok.</div>
                </div>
              ) : (<></>)
              }
            </div>

            <div className='d-flex flex-column col-12 gap-1'>
              <div onClick={() => openInf(3)} className='ques ques-name d-flex col-12 float-left align-items center justify-content-between'>
                <div>Nerede izleyebilirim?</div>
                <div className='ques-plus' >+</div>
              </div>
              {infCtrl === 3 ? (
                <div id='net-watch' className='ques d-flex col-12 float-left align-items center justify-content-between'>
                  <div>İstediğiniz yerde, istediğiniz zaman izleyin. Bilgisayarınızda netflix.com adresinden veya akıllı TV'ler, akıllı telefonlar, tabletler, medya oynatıcılar ve oyun konsolları dahil Netflix uygulamasını sunan, internet bağlantılı herhangi bir cihazda anında izlemek için Netflix hesabınızla oturum açın.
                    <br /><br />Favori içeriklerinizi iOS, Android veya Windows 10 uygulamasıyla da indirebilirsiniz. Seyahatteyken ve internet bağlantısı olmadan izlemek için indirilenleri kullanın. Netflix'i her yere beraberinizde götürün.</div>
                </div>
              ) : (<></>)
              }
            </div>

            <div className='d-flex flex-column col-12 gap-1'>
              <div onClick={() => openInf(4)} className='ques ques-name ques-name d-flex col-12 float-left align-items center justify-content-between'>
                <div>Nasıl iptal ederim?</div>
                <div className='ques-plus' >+</div>
              </div>
              {infCtrl === 4 ? (
                <div id='net-cancel' className='ques d-flex col-12 float-left align-items center justify-content-between'>
                  <div>Netflix esnektir. Sinir bozucu hiçbir sözleşme ve taahhüt yoktur. Hesabınızı çevrimiçi olarak iki tıklamayla kolayca iptal edebilirsiniz. İptal ücreti yoktur - hesabınızı istediğiniz zaman başlatın veya durdurun.</div>
                </div>
              ) : (<></>)
              }
            </div>

            <div className='d-flex flex-column col-12 gap-1'>
              <div onClick={() => openInf(5)} className='ques ques-name d-flex col-12 float-left align-items center justify-content-between'>
                <div>Netflix'te ne izleyebilirim?</div>
                <div className='ques-plus' >+</div>
              </div>
              {infCtrl === 5 ? (
                <div id='net-inf' className='ques d-flex col-12 float-left align-items center justify-content-between'>
                  <div>Netflix, uzun metrajlı filmler, belgeseller, diziler ve programlar, anime, ödüllü Netflix orijinal içerikleri ve daha fazlasından oluşan kapsamlı bir kütüphaneye sahiptir. İstediğiniz her zaman, istediğiniz kadar çok şey izleyin.</div>
                </div>
              ) : (<></>)
              }
            </div>

            <div className='d-flex flex-column col-12 gap-1'>
              <div onClick={() => openInf(6)} className='ques ques-name d-flex col-12 float-left align-items center justify-content-between'>
                <div>Nerede izleyebilirim?</div>
                <div className='ques-plus' >+</div>
              </div>
              {infCtrl === 6 ? (
                <div id='net-what' className='ques d-flex col-12 float-left align-items center justify-content-between'>
                  <div>İstediğiniz yerde, istediğiniz zaman izleyin. Bilgisayarınızda netflix.com adresinden veya akıllı TV'ler, akıllı telefonlar, tabletler, medya oynatıcılar ve oyun konsolları dahil Netflix uygulamasını sunan, internet bağlantılı herhangi bir cihazda anında izlemek için Netflix hesabınızla oturum açın.
                    <br /><br />Favori içeriklerinizi iOS, Android veya Windows 10 uygulamasıyla da indirebilirsiniz. Seyahatteyken ve internet bağlantısı olmadan izlemek için indirilenleri kullanın. Netflix'i her yere beraberinizde götürün.</div>
                </div>
              ) : (<></>)
              }
            </div>

            <div className='d-flex flex-column col-12 gap-1'>
              <div onClick={() => openInf(7)} className='ques ques-name d-flex col-12 float-left align-items center justify-content-between'>
                <div>Netflix çocuklar için uygun mudur?</div>
                <div className='ques-plus' >+</div>
              </div>
              {infCtrl === 7 ? (
                <div id='net-watch' className='ques d-flex col-12 float-left align-items center justify-content-between'>
                  <div>Üyeliğinize dâhil olan Netflix Çocuk deneyimi, çocukların ailece izlenebilecek dizi ve filmleri kendilerine özel bir alanda izlemelerini sağlarken kontrolü ebeveynlere verir.
                    <br /><br />Çocuk profillerinde bulunan PIN korumalı ebeveyn kontrolleri sayesinde, çocukların izleyebileceği içeriklerin yetişkinlik düzeylerini kısıtlayabilir ve onların görmesini istemediğiniz belirli içerikleri engelleyebilirsiniz.</div>
                </div>
              ) : (<></>)
              }
            </div>

            <div className='d-flex flex-column gap-4 align-items-center justify-content-center mt-4'>
              <div>İzlemeye hazır mısınız? Üye olmak ya da hesabınıza tekrar ulaşmak için tek yapmanız gereken e-posta adresinizi girmek.</div>
              <div className='d-flex float-left gap-2'>
                <InputComp setMailHome={setMail} setMailCtrl={setMailCtrl} isValidEmail={isValidEmail} setIsValidEmail={setIsValidEmail}/>
                <button type='button' className='btn-start' onClick={() => signUpPage()}>Başlayın ›</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
