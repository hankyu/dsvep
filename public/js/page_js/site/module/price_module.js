function priceModule()
{
    this.judgementPriceText = function(
    {
        today      = null,
        end_fund   = null,
        offer_fee  = null,
        origin_fee = null
    })
    {
        if (today !== null && end_fund !== null && offer_fee !== null && origin_fee !== null)
        {
            let price;

            if (origin_fee == 0)
            {
                price = '<span class="price">免費</span>';
            }
            else
            {
                if (offer_fee == origin_fee)
                {
                    price = '<span class="price">$' + origin_fee + '</span>';
                }
                else
                {
                    end_fund = new Date(end_fund.replace(/-/g, '/'));

                    if (today > end_fund)
                    {
                        price = '<span class="price">$' + origin_fee + '</span>';
                    }
                    else if (offer_fee == 0)
                    {
                        price = '<span class="price">免費</span>' +
                                '<span class="no-discount">原價' + origin_fee + '</span>';
                    }
                    else
                    {
                        price = '<span class="price">$' + offer_fee + '</span>' +
                                '<span class="no-discount">原價' + origin_fee + '</span>';
                    }
                }
            }

            return price;
        }
        else { return 'lost data'; }
    }
}
