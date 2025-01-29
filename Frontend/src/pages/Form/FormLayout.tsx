import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

const FormLayout = () => {

  const [address, setAddress] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [month, setMonth] = useState('');

  const [scNo, setScNo] = useState('');
  const [consumerID, setConsumerID] = useState('');
  const [months, setMonths] = useState<string[]>([]);

  const [penalty, setPenalty] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/paymentBill', {
        serialNumber: scNo,
        consumerId: consumerID
      });
      const responseData = response.data;
      if (Array.isArray(responseData.pendingOrPenaltyMonths)) {
        const months = responseData.pendingOrPenaltyMonths.map((item: { month: string }) => item.month);
        setMonths(months);
      } else {
        console.error('Unexpected response format:', responseData);
      }
    } catch (error) {
      console.error('Error fetching months:', error);
    }
  };

  const makePayment = async () => {

    localStorage.setItem('scNo', scNo);
    localStorage.setItem('consumerID', consumerID);
    localStorage.setItem('month', month);

    const price = 100 * parseInt(totalAmount)
    try {
      const response = await axios.post('http://localhost:5000/create-checkout-session', {
        totalAmount: price,
      });
      const { url } = response.data;
      window.location.href = url; // Redirect to Stripe Checkout page
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMonthChange = async (selectedMonth: string) => {
    try {
      const response = await axios.post('http://localhost:5000/paymentMonth', {
        serialNumber: scNo,
        consumerId: consumerID,
        year: '2024', // Assuming you need to pass the year
        month: selectedMonth
      });
      const { totalAmount, penalty } = response.data;
      setTotalAmount(totalAmount);
      setPenalty(penalty);
    } catch (error) {
      console.error('Error fetching payment details for month:', error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Check NEA Bill" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* Contact Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Details
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      NEA Location
                    </label>
                    <select
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choose NEA Location</option>
                      <option value="243">AANBU</option>
                      <option value="391">ACHHAM</option>
                      <option value="273">AMUWA</option>
                      <option value="268">ANARMANI</option>
                      <option value="248">ARGHAKHACHI</option>
                      <option value="384">ARUGHAT</option>
                      <option value="345">ATTARIYA</option>
                      <option value="237">BADEGAUN SDC</option>
                      <option value="299">BAGLUNG</option>
                      <option value="381">BAITADI</option>
                      <option value="253">BAJHANG</option>
                      <option value="254">BAJURA</option>
                      <option value="215">BALAJU</option>
                      <option value="BANESHWOR">BANESHWOR</option>
                      <option value="373">BANSGADHI</option>
                      <option value="399">BARAHATHAWA</option>
                      <option value="267">BARDAGHAT SDC</option>
                      <option value="378">BARDIBAS</option>
                      <option value="277">BARHABISE</option>
                      <option value="348">BELAURI</option>
                      <option value="317">BELBARI</option>
                      <option value="339">BELTAR</option>
                      <option value="265">BHADRAPUR</option>
                      <option value="272">BHAIRAHAWA</option>
                      <option value="370">BHAJANI</option>
                      <option value="245">BHAKTAPUR DC</option>
                      <option value="211">BHARATPUR DC</option>
                      <option value="270">BHIMAN</option>
                      <option value="316">BHOJPUR</option>
                      <option value="285">BIRATNAGAR</option>
                      <option value="286">BIRGUNJ DC</option>
                      <option value="301">BODEBARSAIEN</option>
                      <option value="333">BUDHABARE SDC</option>
                      <option value="223">BUDHANILKANTHA</option>
                      <option value="229">BUTWAL</option>
                      <option value="220">CHABAHIL</option>
                      <option value="315">CHAINPUR</option>
                      <option value="294">CHANAULI</option>
                      <option value="356">CHANDRANIGAPUR</option>
                      <option value="217">CHAPAGAUN SDC</option>
                      <option value="326">CHAUTARA</option>
                      <option value="385">DADELDHURA</option>
                      <option value="350">DAILEKH</option>
                      <option value="280">DAMAK</option>
                      <option value="241">DAMAULI</option>
                      <option value="383">DARCHULA</option>
                      <option value="224">DHADING</option>
                      <option value="344">DHANGADI</option>
                      <option value="284">DHANKUTA</option>
                      <option value="302">DHANUSHADHAM</option>
                      <option value="212">DHARAN</option>
                      <option value="269">DHARKE</option>
                      <option value="320">DHULABARI SDC</option>
                      <option value="375">DHUNCHE DC</option>
                      <option value="397">DIKTEL</option>
                      <option value="274">DOLAKHA</option>
                      <option value="366">DOLPA</option>
                      <option value="388">DOTI</option>
                      <option value="271">DUHABI</option>
                      <option value="390">DUMRE</option>
                      <option value="308">FICKEL</option>
                      <option value="235">GAIDAKOT SDC</option>
                      <option value="297">GAIGHAT</option>
                      <option value="225">GAJURI</option>
                      <option value="323">GAUR</option>
                      <option value="287">GAURADAH</option>
                      <option value="359">GAUSALA</option>
                      <option value="250">GHORAHI</option>
                      <option value="238">GORKHA</option>
                      <option value="242">GULARIYA</option>
                      <option value="290">GULMI</option>
                      <option value="330">HANUMAN</option>
                      <option value="231">HETAUDA</option>
                      <option value="292">IILAM</option>
                      <option value="281">INARUWA</option>
                      <option value="264">ITAHARI</option>
                      <option value="354">JAHARE</option>
                      <option value="392">JAJARKOT</option>
                      <option value="331">JALESHOR</option>
                      <option value="261">JANAKPUR DC</option>
                      <option value="275">JIRI</option>
                      <option value="386">JOGBUDA</option>
                      <option value="221">JORPATI</option>
                      <option value="369">JUMLA</option>
                      <option value="318">KALAIYA</option>
                      <option value="380">KALIKOT</option>
                      <option value="351">KANCHANPUR</option>
                      <option value="338">KATARI</option>
                      <option value="247">KAVRE</option>
                      <option value="234">KAWASOTI</option>
                      <option value="306">KHADBARI</option>
                      <option value="325">KHAJURA</option>
                      <option value="282">KHARIDHUNGA</option>
                      <option value="246">KIRTIPUR</option>
                      <option value="309">KNAGAR</option>
                      <option value="324">KOHALPUR</option>
                      <option value="205">KULESHOR</option>
                      <option value="216">LAGANKHEL DC</option>
                      <option value="293">LAHAN</option>
                      <option value="379">LALBANDI</option>
                      <option value="251">LAMAHI</option>
                      <option value="332">LAMJUNG</option>
                      <option value="343">LAMKI</option>
                      <option value="228">LEKHNATH</option>
                      <option value="218">LUBHU SDC</option>
                      <option value="307">LUMBINI</option>
                      <option value="222">MAHARAJGUNJ DC</option>
                      <option value="347">MAHENDRANAGAR</option>
                      <option value="376">MAINAPOKHARI</option>
                      <option value="239">MAJUWA</option>
                      <option value="305">MALANGWA</option>
                      <option value="396">MANGALSEN</option>
                      <option value="296">MANTHALI</option>
                      <option value="303">MAULAPUR</option>
                      <option value="337">MELAMCHI</option>
                      <option value="334">MIRCHIYA</option>
                      <option value="310">MIRMI</option>
                      <option value="362">MUDHE</option>
                      <option value="319">MYAGDI</option>
                      <option value="214">NAXAL</option>
                      <option value="313">NAYAMILL</option>
                      <option value="256">NEPALGUNJ</option>
                      <option value="279">NIJGADH</option>
                      <option value="232">NUWAKOT</option>
                      <option value="355">OKHALDHUNGA DC</option>
                      <option value="263">PALPA</option>
                      <option value="262">PALUNG</option>
                      <option value="335">PANAUTI</option>
                      <option value="249">PANCHKHAL</option>
                      <option value="395">PANCHTHAR</option>
                      <option value="321">PARASI</option>
                      <option value="240">PARBAT</option>
                      <option value="314">PASHUPATINAGAR</option>
                      <option value="382">PATAN</option>
                      <option value="226">POKHARA DC</option>
                      <option value="227">POKHARA GRAMIN SDC</option>
                      <option value="360">POKHARIYA</option>
                      <option value="207">PULCHOWK</option>
                      <option value="357">PYUTHAN</option>
                      <option value="371">RAJAPUR</option>
                      <option value="329">RAJBIRAJ</option>
                      <option value="336">RAMECHHAP</option>
                      <option value="291">RANGELI</option>
                      <option value="288">RANI SUB DC</option>
                      <option value="201">RATNAPARK DC</option>
                      <option value="311">RIDI</option>
                      <option value="387">ROLPA</option>
                      <option value="346">RUKUM</option>
                      <option value="365">RUKUMEAST</option>
                      <option value="374">SAKHUWA</option>
                      <option value="349">SALYAN</option>
                      <option value="352">SANISCHARE SDC</option>
                      <option value="322">SANKHU</option>
                      <option value="398">SILGADHI</option>
                      <option value="230">SIMARA</option>
                      <option value="304">SIMRAUNGADH</option>
                      <option value="276">SINDHU</option>
                      <option value="233">SINDHULI</option>
                      <option value="312">SIRAHA</option>
                      <option value="298">SOLU</option>
                      <option value="327">SURAJPURA</option>
                      <option value="353">SURKHET</option>
                      <option value="358">SURUNGA</option>
                      <option value="278">SYANGJA</option>
                      <option value="236">TANDI</option>
                      <option value="361">TAPLEJUNG</option>
                      <option value="377">TATOPANI</option>
                      <option value="283">TAULIHAWA</option>
                      <option value="341">TEHRATHUM</option>
                      <option value="244">THIMI DC</option>
                      <option value="342">TIKAPUR</option>
                      <option value="328">TRIVENI</option>
                      <option value="252">TULSIPUR</option>
                      <option value="363">TUMLINGTAR</option>
                      <option value="295">URLABARI</option>
                      <option value="372">VURIGAUN</option>
                      <option value="389">YADUKUWA</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <br />
                    <label className="mb-2.5 block text-black dark:text-white">
                      SCNO
                    </label>
                    <input
                      type="text"
                      value={scNo}
                      onChange={(e) => setScNo(e.target.value)}
                      placeholder="Enter SCNO"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full">
                    <br />
                    <label className="mb-2.5 block text-black dark:text-white">
                      ConsumerID
                    </label>
                    <input
                      type="text"
                      value={consumerID}
                      onChange={(e) => setConsumerID(e.target.value)}
                      placeholder="Enter consumerID"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <br />

                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* Payment Details */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Payment Details
              </h3>
            </div>

            <div className="p-6.5">

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Months
                </label>
                <select
                  value={month}
                  onChange={(e) => {
                    const selectedMonth = e.target.value;
                    setMonth(selectedMonth);
                    handleMonthChange(selectedMonth);
                  }}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Choose Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>


              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Your Total Price
                </label>
                <input
                  type="text"
                  value={totalAmount + penalty}
                  readOnly
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Your Penalty
                </label>
                <input
                  type="text"
                  value={penalty}
                  readOnly
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                onClick={makePayment}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout >
  );
};

export default FormLayout;
