import bgImage from '../assets/bgd.jpg'


function BecomeAClient() {

  return (
    <section className="w-full mb-0 pb-0" style={{ marginBottom: 0 }}>
      <div className="mx-auto overflow-hidden">
      <div
      className="relative min-h-[420px] md:min-h-[520px] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
      >
          {/* Overlay to improve text readability */}
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative px-6">
            <h1 className="font-semibold text-white text-2xl md:text-3xl lg:text-4xl drop-shadow-md">
              Stay Compliant with Industry Standards
            </h1>

            <a
              href='https://occuhealth.service-now.com/ohp?id=become_client'
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center rounded-md bg-brand px-6 py-3 text-white text-base md:text-lg font-medium shadow-lg hover:bg-brand-dark hover:shadow-xl transition"
            >
              Become a client
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BecomeAClient;