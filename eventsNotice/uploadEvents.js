const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({ region: "ap-southeast-2" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = "Events";

// The dataset to be uploaded

const data = [
  {
    event_id: uuidv4(),
    event_name: "Sydney Night Noodle Markets",
    start_date: "2024-11-08",
    end_date: "2024-11-18",
    event_type: "Festival",
    cost: "Free",
    description: "The Sydney Night Noodle Markets is one of Sydney's most anticipated food events, offering a vibrant, festive atmosphere in the heart of the city. Over ten nights, Hyde Park is transformed into a bustling Asian hawker-style food market, complete with food stalls offering delicious noodle dishes, dumplings, BBQ meats, and street food from across the Asian continent.",
    image_url: "https://www.goodfoodevents.com.au/wp-content/uploads/2023/10/Website-Header-2.png",
    organiser_name: "Fairfax Events",
    organiser_website: "https://www.goodfoodevents.com.au/",
    city: "Sydney",
    state: "New South Wales",
    address: "Hyde Park, Sydney, NSW 2000"
  },
  {
    event_id: uuidv4(),
    event_name: "Sculpture by the Sea",
    start_date: "2024-11-01",
    end_date: "2024-11-18",
    event_type: "Exibition",
    cost: "Free",
    description: "Sculpture by the Sea is one of the largest free outdoor sculpture exhibitions in the world. Held annually along the picturesque Bondi to Tamarama coastal walk, it attracts thousands of visitors, both locals and tourists, eager to view the stunning collection of sculptures created by artists from around the globe. The event transforms the already stunning coastal walk into an open-air gallery, where over 100 sculptures are carefully placed against the backdrop of Sydney's dramatic coastline. ",
    image_url: "https://sculpturebythesea.com/wp-content/uploads/2015/10/104_AndrewHankin_werefryinouthere_SxSBondi2014_CYee_11-1024x684.jpg",
    organiser_name: "Sculpture by the Sea",
    organiser_website: "https://sculpturebythesea.com/",
    city: "Sydney",
    state: "New South Wales",
    address: "Bondi Beach, Sydney, NSW 2026"
  },
  {
    event_id: uuidv4(),
    event_name: "The Magic of Christmas at Luna Park Sydney",
    start_date: "2024-12-01",
    end_date: "2024-12-25",
    event_type: "Celebration",
    cost: "$40 (General Admission), $90 (Family Pass)",
    description: "The Magic of Christmas at Luna Park Sydney transforms the iconic amusement park into a festive wonderland filled with holiday cheer and excitement. From the moment visitors step through the iconic face entrance, they are greeted with stunning Christmas lights, decorations, and a host of festive activities for all ages.",
    image_url: "https://tickets.lunaparksydney.com/media/calendar_events/image/LPS_NewTicketTypes-LUNAVERSE_TV-LS-2_2.jpg",
    organiser_name: "Luna Park Sydney",
    organiser_website: "https://www.lunaparksydney.com",
    city: "Sydney",
    state: "New South Wales",
    address: "Luna Park Sydney, 1 Olympic Drive, Milsons Point, NSW 2061"
  },
  {
    event_id: uuidv4(),
    event_name: "Adelaide Christmas Pageant",
    start_date: "2024-11-08",
    end_date: "2024-11-08",
    event_type: "Parade",
    cost: "Free",
    description: "The Adelaide Christmas Pageant is one of Australia's most iconic and cherished festive events, celebrating the magic of Christmas for over 80 years. Held annually in November, the pageant transforms the streets of Adelaide into a festive wonderland, drawing crowds of over 300,000 people. Featuring more than 60 floats, marching bands, clowns, dancers, and performers, the pageant offers a spectacular visual display of Christmas cheer.",
    image_url: "https://christmaspageant.com.au/media/xhlglhjk/2023-national-pharmacies-christmas-pageant-1.jpg?width=1920&height=750&quality=90&v=1da111bdce36450",
    organiser_name: "South Australian Government",
    organiser_website: "https://christmaspageant.com.au/",
    city: "Adelaide",
    state: "South Australia",
    address: "King William Street, Adelaide, SA 5000"
  },
  {
    event_id: uuidv4(),
    event_name: "Adelaide Vegan Festival",
    start_date: "2024-11-10",
    end_date: "2024-11-12",
    event_type: "Festival",
    cost: "$10",
    description: "The Adelaide Vegan Festival is South Australia's premier event celebrating plant-based living, sustainability, and animal welfare. Held annually in Victoria Square, this two-day festival attracts thousands of visitors from around Australia, offering a diverse and vibrant experience for vegans, vegetarians, and anyone curious about a plant-based lifestyle. ",
    image_url: "https://images.squarespace-cdn.com/content/v1/56dd40a03c44d8dcc85589ca/1573ce82-2c6a-43a4-9a8b-3bbdd9660232/VFA2021_PictureByTriciaWatkinson.jpg?format=2500w",
    organiser_name: "Vegan Festival Australia",
    organiser_website: "https://www.veganfestival.info/",
    city: "Adelaide",
    state: "South Australia",
    address: "Victoria Square, Adelaide, SA 5000"
  },
  {
    event_id: uuidv4(),
    event_name: "Adelaide Wine Festival",
    start_date: "2024-11-25",
    end_date: "2024-12-05",
    event_type: "Festival",
    cost: "$30",
    description: "The Adelaide Wine Festival is a premier event that celebrates South Australia's world-renowned culinary and wine culture. Held annually, this multi-day festival brings together food lovers, winemakers, and chefs from across the region to showcase the best local produce, wines, and gourmet experiences.",
    image_url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F848249589%2F2072136596283%2F1%2Foriginal.20240912-030850?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C1513%2C2832%2C1416&s=200051eb0f6eb74651d5b28d1372747d",
    organiser_name: "Adelaide Events",
    organiser_website: "https://www.adelaidewinefestival.com.au/",
    city: "Adelaide",
    state: "South Australia",
    address: "Rundle Mall, Adelaide, SA 5000"
  },
  {
    event_id: uuidv4(),
    event_name: "Brisbane Christmas Parade",
    start_date: "2024-12-01",
    end_date: "2024-12-24",
    event_type: "Parade",
    cost: "Free",
    description: "The Brisbane Christmas Parade is one of the city’s most beloved annual events, marking the official start of the festive season. Held in December, the parade features a stunning array of colorful floats, cheerful performers, and festive characters, including Santa Claus himself, spreading joy and holiday spirit throughout Brisbane’s streets.",
    image_url: "https://www.brisbane.qld.gov.au/sites/default/files/styles/event_hero/public/event-images/DgBmaep-jz06DkE8pgwu1OHW.jpg?itok=XVmNprIe",
    organiser_name: "Brisbane City Council",
    organiser_website: "https://www.brisbane.qld.gov.au/",
    city: "Brisbane",
    state: "Queensland",
    address: "King George Square, Brisbane, QLD 4000"
  },
  {
    event_id: uuidv4(),
    event_name: "Brisbane Good Food & Wine Show",
    start_date: "2024-11-08",
    end_date: "2024-11-10",
    event_type: "Festival",
    cost: "$45",
    description: "The Brisbane Good Food & Wine Show is a must-attend event for food lovers and wine enthusiasts, showcasing the finest culinary delights and beverages from Australia and around the world. Held annually at the Brisbane Convention Centre, the event draws thousands of attendees who come to explore a wide variety of gourmet food, premium wines, and artisan products.",
    image_url: "https://goodfoodshow.com.au/app/uploads/sites/10/2024/06/wine-selectors-tasting-rooms.jpg",
    organiser_name: "Good Food & Wine",
    organiser_website: "https://goodfoodshow.com.au/brisbane/",
    city: "Brisbane",
    state: "Queensland",
    address: "Brisbane Convention Centre, Merivale St & Glenelg Street, South Brisbane, QLD 4101"
  },
  {
    event_id: uuidv4(),
    event_name: "Brisbane Festival of Lights",
    start_date: "2024-12-01",
    end_date: "2024-12-15",
    event_type: "Festival",
    cost: "$20",
    description: "The Brisbane Festival of Lights is a dazzling celebration that transforms the city into a vibrant, illuminated wonderland. Held annually in December, this event marks the arrival of the holiday season by adorning Brisbane’s iconic landmarks and public spaces with stunning light installations, festive projections, and interactive displays.",
    image_url: "https://www.lightscapeaustralia.com/_astro/70664f108140c173ae187a722f807b8324a7614c-5906x3939_ZcWmnM.avif",
    organiser_name: "Brisbane City Council",
    organiser_website: "https://www.lightscapeaustralia.com/city/brisbane.html",
    city: "Brisbane",
    state: "Queensland",
    address: "City Botanic Gardens Brisbane, Brisbane, QLD 4000"
  },
  {
    event_id: uuidv4(),
    event_name: "Canberra Handmade Markets",
    start_date: "2024-12-13",
    end_date: "2024-12-15",
    event_type: "Markets",
    cost: "Free",
    description: "The Canberra Handmade Markets are a beloved event that showcases the best of local craftsmanship and creativity, held several times a year, including during the holiday season in late November or early December. Located at Exhibition Park in Canberra (EPIC), these markets bring together talented artisans from across the region, offering a wide variety of handmade products, including jewelry, fashion, home décor, art, and gourmet food.",
    image_url: "https://handmadecanberra.com.au/wp-content/uploads/2024/02/Visiting-The-Market-Information-Page-Honey-Fox-Hats.png",
    organiser_name: "Canberra Handmade",
    organiser_website: "https://handmadecanberra.com.au/",
    city: "Canberra",
    state: "Australian Capital Territory",
    address: "Exhibition Park Flemington Rd, Mitchell, ACT 2602"
  },
  {
    event_id: uuidv4(),
    event_name: "Canberra Christmas in the City",
    start_date: "2024-12-01",
    end_date: "2024-12-24",
    event_type: "Festival",
    cost: "$50",
    description: "The Canberra Christmas in the City is one of the most anticipated festive events in the nation's capital, transforming the heart of the city into a magical Christmas wonderland. Held throughout December, this event brings together the community to celebrate the joy and spirit of the holiday season. The event takes place in the city centre, with a variety of festive activities, market stalls, and entertainment spread across Civic Square and Garema Place.",
    image_url: "https://actcra-files.azureedge.net/image/2024-09/WEB_City%20Renewal%20Authority_City%20Christmas%20Party%2014%20December%202023_Photo%20by%20Kerrie%20Brewer-1690-web%20%281%29.png",
    organiser_name: "City of Canberra",
    organiser_website: "https://festivefinds.inthecity.com.au/",
    city: "Canberra",
    state: "Australian Capital Territory",
    address: "City Centre, Canberra, ACT 2601"
  },
  {
    event_id: uuidv4(),
    event_name: "Canberra Wine and Food Festival",
    start_date: "2024-11-30",
    end_date: "2024-12-03",
    event_type: "Festival",
    cost: "$55",
    description: "The Canberra Wine and Food Festival is a highly anticipated event that celebrates the best of the Canberra region’s culinary and viticulture scene. Held annually in late November or early December at Exhibition Park, this festival brings together local wineries, food producers, and renowned chefs for a weekend filled with tastings, gourmet experiences, and wine education. ",
    image_url: "https://www.outincanberra.com.au/wp-content/uploads/2016/11/canberra-food-wine-expo-9728916.jpg",
    organiser_name: "Canberra City Events",
    organiser_website: "https://www.canberrawines.com.au/events/",
    city: "Canberra",
    state: "Australian Capital Territory",
    address: "City Centre, Canberra, ACT 2601"
  },
  {
    event_id: uuidv4(),
    event_name: "Darwin Street Art Festival",
    start_date: "2024-11-18",
    end_date: "2024-11-20",
    event_type: "Festival",
    cost: "Free",
    description: "The Darwin Street Art Festival is a vibrant celebration of urban creativity, bringing color and life to the streets of Darwin. Held annually in November, this unique festival showcases large-scale murals and street art created by both local and international artists.",
    image_url: "https://static.wixstatic.com/media/ced1aa_7484a040704445cb8315ffc88edf09a3~mv2.jpg/v1/fill/w_953,h_328,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ced1aa_7484a040704445cb8315ffc88edf09a3~mv2.jpg",
    organiser_name: "City of Darwin",
    organiser_website: "https://www.darwinstreetartfestival.com.au/",
    city: "Darwin",
    state: "Northern Territory",
    address: "Smith Street, Darwin, NT 0800"
  },
  {
    event_id: uuidv4(),
    event_name: "Darwin Waterfront Christmas",
    start_date: "2024-12-01",
    end_date: "2024-12-02",
    event_type: "Festival",
    cost: "$20",
    description: "The Darwin Waterfront Christmas is a magical celebration that brings the holiday spirit to the beautiful Darwin Waterfront precinct. Held annually in December, this festive event offers a variety of activities and entertainment for families and visitors to enjoy. The waterfront is transformed into a Christmas wonderland, with twinkling lights, a large Christmas tree, and festive decorations adorning the area, creating a joyful and welcoming atmosphere.",
    image_url: "https://lirp.cdn-website.com/ad7aba94/dms3rep/multi/opt/275378870_1111867362969916_948705170225612485_n-1920w.jpg",
    organiser_name: "Darwin Waterfront Corporation",
    organiser_website: "https://www.waterfront.nt.gov.au/",
    city: "Darwin",
    state: "Northern Territory",
    address: "7 Kitchener Drive Darwin Waterfront Precinct, Darwin, NT 0800"
  },
  {
    event_id: uuidv4(),
    event_name: "Darwin New Year's Eve Celebration",
    start_date: "2024-12-31",
    end_date: "2024-12-31",
    event_type: "Celebration",
    cost: "$30",
    description: "The Darwin New Year's Eve celebration is one of the most exciting events in the Northern Territory, bringing the community together to ring in the New Year in style. Held at the scenic Darwin Waterfront, this lively event features a spectacular fireworks display, live entertainment, and family-friendly activities, making it the perfect way to celebrate the arrival of the new year.",
    image_url: "https://content.api.news/v3/images/bin/a96d82bfa7eee0ea9c582ba5b1c9153a",
    organiser_name: "Darwin City Council",
    organiser_website: "https://www.darwin.nt.gov.au/",
    city: "Darwin",
    state: "Northern Territory",
    address: "Darwin Waterfront Precinct, Darwin, NT 0800"
  },
  {
    event_id: uuidv4(),
    event_name: "Hobart Christmas Pageant",
    start_date: "2024-11-12",
    end_date: "2024-11-12",
    event_type: "Parade",
    cost: "Free",
    description: "The Hobart Christmas Pageant is a cherished annual tradition that brings the festive spirit to Tasmania’s capital. Held in early December, this lively parade winds its way through the streets of Hobart, drawing thousands of spectators who come to enjoy the colorful floats, marching bands, and festive performances.",
    image_url: "https://www.hobartcity.com.au/files/assets/public/v/2/community/christmas/2023/coh_xmas_pageant_2023_0588.jpg",
    organiser_name: "City of Hobart",
    organiser_website: "https://www.hobartcity.com.au/Community/Christmas/Myer-City-of-Hobart-Christmas-Pageant",
    city: "Hobart",
    state: "Tasmania",
    address: "Hobart CBD, TAS 7000"
  },
  {
    event_id: uuidv4(),
    event_name: "Hobart Taste of Tasmania",
    start_date: "2024-12-28",
    end_date: "2025-01-04",
    event_type: "Festival",
    cost: "$25",
    description: "The Taste of Tasmania is one of Hobart's most iconic festivals, celebrating the region's exceptional food, wine, and produce. Held annually along Hobart’s waterfront during the holiday season, from late December through early January, the festival attracts both locals and tourists, eager to sample the very best that Tasmania has to offer. The event takes place at Princes Wharf and surrounds, offering a stunning backdrop of the Derwent River and the city’s historic waterfront.",
    image_url: "https://images.squarespace-cdn.com/content/v1/6685e77fa56e7c08374f18be/00f1e36a-ca39-43d2-99ed-bb8aaf9c4f8e/Taste_of_Summer_2023_24_0530.jpg",
    organiser_name: "Taste Tasmania",
    organiser_website: "https://www.tasteofsummer.com.au/",
    city: "Hobart",
    state: "Tasmania",
    address: "Salamanca Place, Hobart, TAS 7000"
  },
  {
    event_id: uuidv4(),
    event_name: "Hobart Twilight Markets",
    start_date: "2024-11-29",
    end_date: "2024-11-30",
    event_type: "Markets",
    cost: "Free",
    description: "The Hobart Twilight Markets are a popular evening event held regularly in the vibrant Salamanca Place, offering a unique blend of local artisan products, gourmet food, and live entertainment. Typically held on Friday evenings from November to March, the markets provide an opportunity for visitors to experience Hobart’s creative spirit in a festive, laid-back atmosphere.",
    image_url: "https://hobarttwilightmarket.com.au/wp-content/uploads/2023/12/HTM-BSP-2023-OCT.jpg",
    organiser_name: "Hobart City Council",
    organiser_website: "https://hobarttwilightmarket.com.au/",
    city: "Hobart",
    state: "Tasmania",
    address: "Brooke St Pier, Hobart, TAS 7000"
  },
  {
    event_id: uuidv4(),
    event_name: "Melbourne Music Week",
    start_date: "2024-11-15",
    end_date: "2024-11-22",
    event_type: "Festival",
    cost: "$30",
    description: "The Melbourne Music Week (MMW) is one of the city’s most dynamic and anticipated annual events, celebrating the richness of Melbourne’s vibrant music scene. Held in November, this week-long festival showcases local, national, and international talent across a wide array of genres, including rock, electronic, jazz, indie, and experimental music.",
    image_url: "https://www.visitmelbourne.com/-/media/atdw/high-country/whats-on/music/festivals/1b2fdadab70663f70ca97cd2364d3251_1600x1200.jpeg?ts=20231120331243",
    organiser_name: "City of Melbourne",
    organiser_website: "https://nowornever.melbourne.vic.gov.au/",
    city: "Melbourne",
    state: "Victoria",
    address: "Federation Square, Melbourne, VIC 3000"
  },
  {
    event_id: uuidv4(),
    event_name: "Melbourne Christmas Festival",
    start_date: "2024-12-01",
    end_date: "2024-12-24",
    event_type: "Festival",
    cost: "Free",
    description: "The Melbourne Christmas Festival is a magical month-long celebration that transforms the city into a festive wonderland during the holiday season. Taking place from late November to December, this annual event brings together dazzling Christmas lights, festive markets, family-friendly activities, and iconic installations, making it one of the most anticipated events of the year for locals and tourists alike.",
    image_url: "https://mvga-prod-files.s3.ap-southeast-4.amazonaws.com/public/styles/740x600/public/2024-05/town-hall_christmas-lights-2013-med.jpg.webp?itok=4sHXn9Pt",
    organiser_name: "Melbourne City Council",
    organiser_website: "https://www.melbourne.vic.gov.au/christmas-festival",
    city: "Melbourne",
    state: "Victoria",
    address: "Melbourne CBD, VIC 3000"
  },
  {
    event_id: uuidv4(),
    event_name: "White Night Melbourne",
    start_date: "2024-11-23",
    end_date: "2024-11-23",
    event_type: "Festival",
    cost: "$50",
    description: "White Night Melbourne is a spectacular one-night festival that transforms the city into a vibrant canvas of art, light, and creativity. Held annually, typically in late November, this event brings together local and international artists to showcase their talents through large-scale light installations, immersive projections, and street performances, turning Melbourne’s streets and landmarks into an open-air gallery. The festival celebrates art in all its forms, from visual arts to music, theatre, and dance, creating a captivating atmosphere for attendees of all ages.",
    image_url: "https://whitenight.com.au/wp-content/uploads/2024/05/WNB-Light-Walk.jpg",
    organiser_name: "Visit Victoria",
    organiser_website: "https://whitenight.com.au/",
    city: "Melbourne",
    state: "Victoria",
    address: "Melbourne CBD, VIC 3000"
  },
  {
    event_id: uuidv4(),
    event_name: "Perth Christmas Pageant",
    start_date: "2024-12-07",
    end_date: "2024-12-07",
    event_type: "Parade",
    cost: "Free",
    description: "The Perth Christmas Pageant is one of the city’s most cherished festive traditions, heralding the start of the holiday season with a magical and colorful parade through the streets of Perth. Held annually in early December, the pageant features a spectacular display of festive floats, marching bands, costumed performers, and beloved Christmas characters that captivate audiences of all ages. Thousands of locals and visitors line the streets to enjoy this lively event, which has been a highlight of Perth’s holiday calendar for many years.",
    image_url: "https://auslanstageleft.com.au/wp-content/uploads/2021/11/MANDURAH-Christmas-pageant-hero.jpg",
    organiser_name: "City of Perth",
    organiser_website: "https://www.7perthchristmaspageant.com/",
    city: "Perth",
    state: "Western Australia",
    address: "St Georges Terrace, Perth, WA 6000"
  },
  {
    event_id: uuidv4(),
    event_name: "Perth International Arts Festival",
    start_date: "2024-11-24",
    end_date: "2024-12-15",
    event_type: "Festival",
    cost: "$40",
    description: "The Perth International Arts Festival (PIAF) is one of Australia's longest-running and most prestigious cultural events, showcasing a diverse array of artistic performances, exhibitions, and experiences from around the world. Held annually in February and March, this multi-disciplinary festival transforms Perth into a vibrant hub of creativity, bringing together leading international and Australian artists to present works across theatre, music, dance, visual arts, and literature.",
    image_url: "https://www.perthfestival.com.au/media/vizjayah/web_230210_pf_djoondal_photo-by-courtney-mcallister.jpg?anchor=center&mode=crop&width=1410&height=768&rnd=133590164363270000",
    organiser_name: "Perth Arts Festival",
    organiser_website: "https://www.perthfestival.com.au/",
    city: "Perth",
    state: "Western Australia",
    address: "Various venues, Perth, WA 6000"
  },
  {
    event_id: uuidv4(),
    event_name: "Perth Summer Festival",
    start_date: "2024-12-01",
    end_date: "2024-12-10",
    event_type: "Festival",
    cost: "$45",
    description: "The Perth Summer Festival is a vibrant outdoor celebration of the arts, live music, food, and summer fun, held annually during the warm months of December and January. This lively festival transforms iconic locations such as Kings Park, the Perth Cultural Centre, and various outdoor venues into bustling hubs of activity, offering residents and visitors a perfect way to enjoy Perth’s beautiful summer evenings.",
    image_url: "https://www.dbca.wa.gov.au/sites/default/files/styles/feature_large_850x425/public/2022-11/bgpa_kp_festival_j_thomas.jpg",
    organiser_name: "Perth City Council",
    organiser_website: "https://perth.wa.gov.au/",
    city: "Perth",
    state: "Western Australia",
    address: "Kings Park, Perth, WA 6005"
  }
];

// Function to upload data to DynamoDB
const uploadData = async () => {
  for (const item of data) {
    // Define parameters for the put operation
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      // Upload item to DynamoDB
      await dynamodb.put(params).promise();
      console.log(`Added data for ${item.event_name}`);
    } catch (error) {
      console.error("Unable to add data:", error.message);
    }
  }
  console.log("Data upload complete!");
};

// Execute the data upload function
uploadData();
