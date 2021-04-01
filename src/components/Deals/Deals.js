import React from 'react';

const dealsData=[
    {
        pic:"https://images.freekaamaal.com/store_desc_images/1516166339.jpg",
        price:'10',
        deal:'Best deals on couple T-Shirt only at $10 for each'
    },
    {
        pic:"https://lh3.googleusercontent.com/proxy/XEYkY-db--wMlreBZRBYzKAZKDeJAOz9ZcogzjbzKGyu4gEDL_-1HldJqP5OaKsvhZGo17SgxLc9DGDmQqU_peT8Zf0iFuxpVN1u5nKyTQoLqqS3RHCruIAoQ5g0bwH7mKV0C4aww4ReP-iAuX6MUDqVv--_Fvs4glClgTUlbVfw0e5SbHPJ0-MUDooohwXF1kx1kW6pPGr31CWYJQHuQZKOlxb9",
        price:'15',
        deal:'Purchase three T shirts at $14.99 each'
    },
    {
        pic:'https://www.eztshirtprints.com/wp-content/uploads/2018/04/image2.jpg',
        price:'5',
        deal:'Get the best deals for custom T Shirts printed at only $4.99'
    }
]

const Deals = () => {
    return (
      <div className="container">
        {
            dealsData.map(deal=>{
                return (<div class="card mb-3">
          <img class="card-img-top" src={deal.pic} alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">
              <span>$</span>
              <span> {deal.price}</span>
            </h5>
            <p class="card-text">{deal.deal}</p>
          </div>
        </div>)
            })
        }
      </div>
    );
};

export default Deals;