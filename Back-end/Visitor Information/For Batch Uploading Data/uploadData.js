const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({ region: "ap-southeast-2" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = "VisitorInfo";

// The dataset to be uploaded

const data = [
  {
    AttractionID: uuidv4(),
    City: "Sydney",
    State: "New South Wales",
    Name: "Sydney Opera House",
    Description: "Iconic performing arts venue located on Sydney's harbour.",
    Detail:
      "The Sydney Opera House is a UNESCO World Heritage site known for its unique architecture and world-class performances.",
    Location: "Bennelong Point, Sydney, NSW",
    Image:
      "https://i0.wp.com/www.steensenvarming.com/wp-content/uploads/2022/12/Sydney-Opera-House-2-1.jpg?fit=1024%2C943&ssl=1",
  },
  {
    AttractionID: uuidv4(),
    City: "Sydney",
    State: "New South Wales",
    Name: "Sydney Harbour Bridge",
    Description: "Famous bridge with panoramic views of the city.",
    Detail:
      "The Sydney Harbour Bridge is one of the most famous landmarks in Australia, offering bridge climbs and breathtaking views.",
    Location: "Sydney Harbour, Sydney, NSW",
    Image:
      "https://upload.wikimedia.org/wikipedia/commons/d/de/Sydney_%28AU%29%2C_Harbour_Bridge_--_2019_--_2179.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Sydney",
    State: "New South Wales",
    Name: "Bondi Beach",
    Description: "Popular beach known for its surf and lively atmosphere.",
    Detail:
      "Bondi Beach is a major attraction known for its golden sands, surf culture, and vibrant social scene.",
    Location: "Bondi Beach, Sydney, NSW",
    Image:
      "https://img.delicious.com.au/k8aVJhT-/del/2023/09/bondi-beach-sydney-source-istock-195523-2.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Melbourne",
    State: "Victoria",
    Name: "Fitzroy Gardens",
    Description: "Historic gardens with beautiful plant displays and pathways.",
    Detail:
      "Fitzroy Gardens is a Victorian-era garden in Melbourne known for its stunning floral displays, historic buildings, and tranquil paths.",
    Location: "Wellington Parade, East Melbourne, VIC",
    Image: "https://media.timeout.com/images/105380522/750/422/image.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Melbourne",
    State: "Victoria",
    Name: "Royal Botanic Gardens",
    Description: "Extensive gardens with a wide variety of plant species.",
    Detail:
      "The Royal Botanic Gardens in Melbourne features extensive collections of native and exotic plants, offering scenic views and walking trails.",
    Location: "Birdwood Ave, South Yarra, VIC",
    Image:
      "https://www.visitmelbourne.com/-/media/atdw/melbourne/see-and-do/nature-and-wildlife/parks-and-gardens/ebd189686e916626b17b19e0784852b7_1600x1200.jpeg?ts=20230615450626",
  },
  {
    AttractionID: uuidv4(),
    City: "Melbourne",
    State: "Victoria",
    Name: "National Gallery of Victoria",
    Description: "Australia's oldest public art museum.",
    Detail:
      "The National Gallery of Victoria is renowned for its extensive collection of international and Australian art.",
    Location: "180 St Kilda Rd, Melbourne, VIC",
    Image:
      "https://www.artnews.com/wp-content/uploads/2022/04/1_SecchiSmith_NGV-Contemporary-e1650401788992.jpg?w=1200",
  },
  {
    AttractionID: uuidv4(),
    City: "Brisbane",
    State: "Queensland",
    Name: "South Bank Parklands",
    Description: "Lush riverside parkland with walking paths and city views.",
    Detail:
      "South Bank Parklands is a vibrant cultural and recreational precinct with a man-made beach, markets, and entertainment venues.",
    Location: "South Bank, Brisbane, QLD",
    Image:
      "https://assets.atdw-online.com.au/images/c641be4af4ff6204d79a5ea332e309b4.jpeg?q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjU2YjI1ZjdkYWVlZWFhZjc3M2NmMWZmNSIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwY2IiLCJhcGlrZXlJZCI6IjU2YjFlZmVlMGNmMjEzYWQyMGRkMjE3MCJ9&rect=0%2C0%2C2048%2C1536&rot=360&w=600",
  },
  {
    AttractionID: uuidv4(),
    City: "Brisbane",
    State: "Queensland",
    Name: "Lone Pine Koala Sanctuary",
    Description: "World's first and largest koala sanctuary.",
    Detail:
      "Lone Pine Koala Sanctuary offers close encounters with koalas, kangaroos, and other Australian wildlife.",
    Location: "708 Jesmond Rd, Fig Tree Pocket, QLD",
    Image: "https://i.ytimg.com/vi/x5uvIG5bjyw/hqdefault.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Brisbane",
    State: "Queensland",
    Name: "Story Bridge",
    Description: "Iconic cantilever bridge with scenic views.",
    Detail:
      "The Story Bridge is a heritage-listed bridge offering panoramic views of Brisbane and the option for adventure climbs.",
    Location: "Story Bridge, Brisbane, QLD",
    Image:
      "https://assets.atdw-online.com.au/images/0a92fc306222b8ca10b180d3d287fc09.jpeg?q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjU2YjI2MTgyYWVlZWFhZjc3M2NmNDlmYSIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwY2IiLCJhcGlrZXlJZCI6IjU2YjFlZmVlMGNmMjEzYWQyMGRkMjE3MCJ9&rect=152%2C0%2C2163%2C1622&w=600",
  },
  {
    AttractionID: uuidv4(),
    City: "Perth",
    State: "Western Australia",
    Name: "Kings Park and Botanic Garden",
    Description:
      "Expansive park with native flora and stunning views of Perth.",
    Detail:
      "Kings Park is one of the largest inner-city parks in the world, known for its beautiful gardens and sweeping views of Perth.",
    Location: "Fraser Ave, Perth, WA",
    Image:
      "https://www.qantas.com/content/travelinsider/en/explore/australia/western-australia/perth/beautiful-bushland-at-kings-park-and-botanic-garden/_jcr_content/parsysTop/hero.img.full.medium.jpg/1532404541642.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Perth",
    State: "Western Australia",
    Name: "Swan River",
    Description:
      "Scenic river with opportunities for boating, walking, and picnicking.",
    Detail:
      "The Swan River offers numerous recreational activities, including sailing, kayaking, and riverside walks.",
    Location: "Perth, WA",
    Image:
      "https://res.cloudinary.com/simpleview/image/upload/v1700159440/clients/perthrto/Little_Ferry_Company_4_03c186c6-22a7-4d0b-a1ee-9d4730de8c64.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Perth",
    State: "Western Australia",
    Name: "Cottesloe Beach",
    Description:
      "Popular beach known for its crystal-clear waters and lively atmosphere.",
    Detail:
      "Cottesloe Beach is a favorite among locals and tourists for swimming, snorkeling, and sunset views.",
    Location: "Marine Parade, Cottesloe, WA",
    Image:
      "https://afar.brightspotcdn.com/dims4/default/80f9492/2147483647/strip/true/crop/1166x800+217+0/resize/660x453!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F20%2F1f%2Ff65b8e37cbd8365a73175e8154b2%2Foriginal-bcaa19b7828bea605bf2a1125c4170db.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Adelaide",
    State: "South Australia",
    Name: "Adelaide Central Market",
    Description: "Bustling market with fresh produce and gourmet food.",
    Detail:
      "Adelaide Central Market is a food lover's paradise with over 70 traders offering local and international produce.",
    Location: "Gouger St, Adelaide, SA",
    Image:
      "https://images.adsttc.com/media/images/5dfb/a920/3312/fd37/1000/02d7/medium_jpg/1.jpg?1576773909",
  },
  {
    AttractionID: uuidv4(),
    City: "Adelaide",
    State: "South Australia",
    Name: "Adelaide Zoo",
    Description: "Historic zoo home to a wide variety of animal species.",
    Detail:
      "Adelaide Zoo is the second oldest zoo in Australia, known for its giant pandas and extensive conservation efforts.",
    Location: "Frome Rd, Adelaide, SA",
    Image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/5f/61.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Adelaide",
    State: "South Australia",
    Name: "Adelaide Botanic Garden",
    Description: "Botanic gardens with native and exotic plants.",
    Detail:
      "The Adelaide Botanic Garden offers beautifully landscaped grounds, glasshouses, and a wide variety of plant collections.",
    Location: "North Terrace, Adelaide, SA",
    Image:
      "https://cdn.environment.sa.gov.au/img/eyJidWNrZXQiOiJlbnZzYS1idWNrZXQiLCJrZXkiOiJib3RhbmljZ2FyZGVucy9pbWFnZXMvMTgwNDEzLXBhbG0taG91c2UuanBnIiwiZWRpdHMiOnsianBlZyI6eyJxdWFsaXR5Ijo4MiwicHJvZ3Jlc3NpdmUiOnRydWUsInRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pemVTY2FucyI6dHJ1ZX0sInJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0Ijo5MDAsImZpdCI6ImNvdmVyIn0sInNoYXJwZW4iOnRydWV9fQ==",
  },
  {
    AttractionID: uuidv4(),
    City: "Hobart",
    State: "Tasmania",
    Name: "Salamanca Place",
    Description: "Historic waterfront area with markets and galleries.",
    Detail:
      "Salamanca Place is famous for its sandstone warehouses, which now house cafes, galleries, and boutiques.",
    Location: "Salamanca Pl, Hobart, TAS",
    Image:
      "https://lp-cms-production.imgix.net/2019-06/98266cd6b5d6b6a8e793660e573ba7f6-salamanca-place.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Hobart",
    State: "Tasmania",
    Name: "Mount Wellington",
    Description: "Mountain offering panoramic views of Hobart.",
    Detail:
      "Mount Wellington, also known as Kunanyi, provides stunning views over Hobart and the surrounding wilderness.",
    Location: "Pinnacle Rd, Wellington Park, TAS",
    Image:
      "https://images.squarespace-cdn.com/content/v1/5dec97016597cc7e187a62a2/1600859219430-BB8YX82WF4BT6YB2CFJQ/135123-56.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Hobart",
    State: "Tasmania",
    Name: "Museum of Old and New Art (MONA)",
    Description:
      "Contemporary art museum with a unique and provocative collection.",
    Detail:
      "MONA is Australia's largest privately funded museum, known for its thought-provoking art exhibitions.",
    Location: "655 Main Rd, Berriedale, TAS",
    Image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjF3pO7ObzcECdWsM6jZREsUGIw6K2VU1LjQ&s",
  },
  {
    AttractionID: uuidv4(),
    City: "Darwin",
    State: "Northern Territory",
    Name: "Darwin Waterfront Precinct",
    Description:
      "Modern waterfront area with restaurants and recreational facilities.",
    Detail:
      "The Darwin Waterfront Precinct offers swimming lagoons, wave pools, and a variety of dining and shopping options.",
    Location: "Kitchener Dr, Darwin, NT",
    Image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/36/10/c4/darwin-wharf-precinct.jpg?w=600&h=-1&s=1",
  },
  {
    AttractionID: uuidv4(),
    City: "Darwin",
    State: "Northern Territory",
    Name: "Kakadu National Park",
    Description:
      "World Heritage-listed national park with rich Aboriginal heritage.",
    Detail:
      "Kakadu National Park is known for its diverse landscapes, including wetlands, waterfalls, and ancient rock art sites.",
    Location: "Jabiru, NT",
    Image:
      "https://realaussieadventures.com/wp-content/uploads/2021/12/Twin-Falls-from-above-Mandatory-credit-Tourism-NTSam-Earp.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Darwin",
    State: "Northern Territory",
    Name: "Litchfield National Park",
    Description:
      "National park known for its waterfalls and natural swimming holes.",
    Detail:
      "Litchfield National Park is a popular destination for its stunning waterfalls, bushwalking tracks, and clear swimming spots.",
    Location: "Batchelor, NT",
    Image:
      "https://static.wixstatic.com/media/be08f8_fdbe08054b69424f9c91cabf26d5e50a~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/be08f8_fdbe08054b69424f9c91cabf26d5e50a~mv2.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Canberra",
    State: "Australian Capital Territory",
    Name: "Australian War Memorial",
    Description: "National memorial to Australian military history.",
    Detail:
      "The Australian War Memorial combines a shrine, museum, and archive to honor the sacrifice of Australian military personnel.",
    Location: "Treloar Crescent, Campbell, ACT",
    Image:
      "https://hotelkurrajong.com.au/wp-content/uploads/2020/02/canberra-accomodation-attractions-war-memorial-1500x880.jpg",
  },
  {
    AttractionID: uuidv4(),
    City: "Canberra",
    State: "Australian Capital Territory",
    Name: "National Gallery of Australia",
    Description: "Largest art museum in Australia with extensive collections.",
    Detail:
      "The National Gallery of Australia houses an extensive collection of Australian, Indigenous, and international art.",
    Location: "Parkes Pl E, Parkes, ACT",
    Image:
      "https://upload.wikimedia.org/wikipedia/commons/8/82/National_Gallery_of_Australia_October_2012.JPG",
  },
  {
    AttractionID: uuidv4(),
    City: "Canberra",
    State: "Australian Capital Territory",
    Name: "Lake Burley Griffin",
    Description:
      "Man-made lake offering recreational activities and scenic views.",
    Detail:
      "Lake Burley Griffin is a popular spot for cycling, rowing, and enjoying the views of Canberra’s landmarks.",
    Location: "Canberra, ACT",
    Image:
      "https://live-production.wcms.abc-cdn.net.au/e7d739fe7aff6982684979a3cabe9860?impolicy=wcms_crop_resize&cropH=1722&cropW=3061&xPos=627&yPos=0&width=862&height=485",
  },
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
      console.log(`Added data for ${item.City}`);
    } catch (error) {
      console.error("Unable to add data:", error.message);
    }
  }
  console.log("Data upload complete!");
};

// Execute the data upload function
uploadData();
