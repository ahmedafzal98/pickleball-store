const categories = [
  {
    name: "Online Premier Pickleball Schools",
    image_url:
      "https://media.istockphoto.com/id/1458093871/photo/focus-on-foreground-with-multiracial-couple-active-retirees-playing-pickleball-outdoors.jpg?s=1024x1024&w=is&k=20&c=W7k9xPCt7AtY72k9PapVLuzhlkuJoYpJB3WKndfk_-s=",
    subcategories: [],
  },
  {
    name: "Air Fresheners",
    image_url:
      "https://media.istockphoto.com/id/1458877296/photo/pickleball-pedestal.jpg?s=1024x1024&w=is&k=20&c=dFCmhk_ox2GBEmfvLts3c5GBILf7E7HwIbni43F0yBY=",
    subcategories: [{ name: "Pickle Fragrances", image_url: "" }],
  },
  {
    name: "Bags and Backpacks",
    image_url:
      "https://media.istockphoto.com/id/1089296964/photo/smiling-sportswoman-with-racket-for-squash.jpg?s=612x612&w=0&k=20&c=I2O6wbdwzSz2VedwtA4ssvfJg36brufAjdffLNKi8os=",
    subcategories: [
      { name: "Backpacks", image_url: "" },
      { name: "Duffel Bags", image_url: "" },
      { name: "Fanny Packs", image_url: "" },
    ],
  },
  {
    name: "Ball Machines",
    image_url:
      "https://media.istockphoto.com/id/1251373918/photo/the-balls-are-in-a-basket-on-the-hardcourt-and-picking-up-the-ball.jpg?s=612x612&w=0&k=20&c=oaMzq8sqtUm-u2oVB_CFSs0EiwAn5X8mnnZwzxcYEtM=",
    subcategories: [],
  },
  {
    name: "Ball Picker Uppers",
    image_url:
      "https://media.istockphoto.com/id/2200641666/photo/athletic-male-pickleball-player-is-on-return-on-hardcourt-horizontal-pickleball-still.jpg?s=612x612&w=0&k=20&c=xxX442a2VBYCGP6TlXR8vZkxpC5YlbQFly4RAyZPGiQ=",
    subcategories: [],
  },
  {
    name: "Balls",
    image_url:
      "https://media.istockphoto.com/id/1462212999/photo/pickleball-are-many-sports-balls-top-view-closeup-3d-rendering.jpg?s=612x612&w=0&k=20&c=iDF_bho0vt85Ombjn4rk7VQm7UHV0xeeWYuF2w7XVE8=",
    subcategories: [
      { name: "Dura", image_url: "" },
      { name: "Engage", image_url: "" },
      { name: "Franklin", image_url: "" },
      { name: "Selkirk", image_url: "" },
      { name: "Signature Ball", image_url: "" },
    ],
  },
  {
    name: "Ball Holders/Baskets",
    image_url:
      "https://media.istockphoto.com/id/959987076/photo/pickleballs-in-basket.jpg?s=612x612&w=0&k=20&c=c6e4_Fa4S28i8AgbPmvxYccTZhlnGKidZ7vDI0aHKB0=",
    subcategories: [],
  },
  {
    name: "Batteries",
    image_url:
      "https://media.istockphoto.com/id/1371557308/vector/industrial-energy-and-power-logo-design-concept-battery-and-gear-icon-vector-logo-design.jpg?s=612x612&w=0&k=20&c=GXqNvCL8ynOH8FOmvpB8Ps0EB87jZKsAmkpU7A-KE3g=",
    subcategories: [
      { name: "Alkaline", image_url: "" },
      { name: "Car", image_url: "" },
      { name: "Rechargeable", image_url: "" },
      { name: "RV", image_url: "" },
      { name: "Solar", image_url: "" },
    ],
  },
  {
    name: "Better Sleep and Relaxation",
    image_url:
      "https://media.istockphoto.com/id/2169465588/photo/woman-laying-on-court-after-playing-pickleball.jpg?s=612x612&w=0&k=20&c=OpbKXN305Z7CtwnasD7D4ut4Dt444cHyIFv4bPxlhQw=",
    subcategories: [
      { name: "Acupressure/Acupuncture", image_url: "" },
      { name: "Airplane Pillows", image_url: "" },
      { name: "Bath Bombs", image_url: "" },
      { name: "Bedsheets, Linens and Skirts", image_url: "" },
      { name: "Blankets", image_url: "" },
      { name: "Dehumidifiers", image_url: "" },
      { name: "Detox Foot Spas", image_url: "" },
      { name: "Duvets", image_url: "" },
      { name: "Earplugs", image_url: "" },
    ],
  },
  {
    name: "Bikes, Scooters and Accessories",
    image_url:
      "https://media.istockphoto.com/id/667439248/vector/isolated-electric-scooter-one-and-two-wheeled-mobility-vehicle-vector-illustration-eco.jpg?s=612x612&w=0&k=20&c=RcHZSlnJiGFZinGdUW1fxREmR9gHEqD36NkP02sEbOU=",
    subcategories: [
      { name: "Bikes", image_url: "" },
      { name: "Electric", image_url: "" },
      { name: "Standard", image_url: "" },
      { name: "Scooters", image_url: "" },
      { name: "Locks", image_url: "" },
    ],
  },
  {
    name: "Body Scan Machines",
    image_url:
      "https://media.istockphoto.com/id/1345238514/photo/people-test-out-a-vbx-vibration-wellness-exercise-equipment-at-the-minnesota-state-fair.jpg?s=612x612&w=0&k=20&c=giWApT9svYgx13kFEQUB2YdK-pq3gchG29ZvRoR7s0w=",
    subcategories: [],
  },
  {
    name: "Books and Magazines",
    image_url:
      "https://media.istockphoto.com/id/2196723262/vector/pickleball-cards-set3.jpg?s=612x612&w=0&k=20&c=3e9TDAfLHkOCmKa-72aBtrEoikInlIJHEuIOBLqdP0s=",
    subcategories: [],
  },
  {
    name: "Braces and Supports",
    image_url:
      "https://media.istockphoto.com/id/1448546591/photo/colombian-american-hispanic-couple-playing-pickle-ball-on-sunny-autumn-day-photo-series.jpg?s=612x612&w=0&k=20&c=kNfUYSUAM2kOKwA9ywvxuypNMAEh1WylC3OjN7DO3hs=",
    subcategories: [
      { name: "Ankle", image_url: "" },
      { name: "Arm and Elbow", image_url: "" },
      { name: "Back", image_url: "" },
      { name: "Knee", image_url: "" },
      { name: "KT Tape", image_url: "" },
      { name: "Neck", image_url: "" },
      { name: "Shoulder", image_url: "" },
    ],
  },
  {
    name: "Bumper Stickers",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Cal AI Macros and Nutrient Tracker AP",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Candles",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Candy",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Carabiners/Hooks",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Car/Truck Accessories",
    image_url: "",
    subcategories: [
      { name: "Air Fresheners", image_url: "" },
      { name: "Pickle Fragrance", image_url: "" },
      { name: "Cell Phone", image_url: "" },
      { name: "Seat covers", image_url: "" },
      { name: "Magnetic", image_url: "" },
    ],
  },

  {
    name: "Catering and Party Supplies",
    image_url: "",
    subcategories: [
      { name: "Balloons", image_url: "" },
      { name: "Bottle Openers", image_url: "" },
      { name: "Birthday and Anniversary Signs and Posters", image_url: "" },
      { name: "Gift Bags", image_url: "" },
      { name: "Inflatable Pickleball Costumes/Outfits", image_url: "" },
      { name: "Label Makers", image_url: "" },
      { name: "Laminating Machines", image_url: "" },
      { name: "Lighting", image_url: "" },
      { name: "Lanterns", image_url: "" },
      { name: "Mosquito Repellent", image_url: "" },
      { name: "Napkins", image_url: "" },
      { name: "Plastic Cups", image_url: "" },
      { name: "Plastic Silverware", image_url: "" },
      { name: "Speakers, Sound Systems and Microphones", image_url: "" },
      { name: "Signature Ball", image_url: "" },
      { name: "Stencils", image_url: "" },
      { name: "Tablecloths", image_url: "" },
      { name: "Temporary Tattoos", image_url: "" },
      { name: "Wrapping Paper/Gift Wrap", image_url: "" },
    ],
  },
  {
    name: "CBD Products",
    image_url: "",
    subcategories: [{ name: "Sleep Cream: sleepcream.com", image_url: "" }],
  },
  {
    name: "Cell Phone Accessories",
    image_url: "",
    subcategories: [
      { name: "Battery Packs", image_url: "" },
      { name: "Cases", image_url: "" },
      { name: "Cords", image_url: "" },
      { name: "Chargers", image_url: "" },
      { name: "Fast", image_url: "" },
      { name: "Solar", image_url: "" },
      { name: "Charging Stations", image_url: "" },
      { name: "Holders", image_url: "" },
      { name: "Ring Tones", image_url: "" },
    ],
  },
  {
    name: "Chairs, Cushions, and Mats",
    image_url: "",
    subcategories: [
      { name: "Bleacher", image_url: "" },
      { name: "Folding", image_url: "" },
    ],
  },
  {
    name: "Children",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Christmas",
    image_url: "",
    subcategories: [
      { name: "Cards", image_url: "" },
      { name: "Gifts", image_url: "" },
      { name: "Signature Ball", image_url: "" },
      { name: "Wrapping Paper", image_url: "" },
    ],
  },
  {
    name: "Clothing",
    image_url: "",
    subcategories: [
      { name: "Arm sleeves", image_url: "" },
      { name: "Bandanas", image_url: "" },
      { name: "People", image_url: "" },
      { name: "Dogs", image_url: "" },
      { name: "Caps and Hats", image_url: "" },
      { name: "Dresses", image_url: "" },
      { name: "Next Level", image_url: "" },
      { name: "Gloves", image_url: "" },
      { name: "Heated Clothing", image_url: "" },
      { name: "Headbands/Wristbands/Sweatbands", image_url: "" },
      { name: "Inflatable Pickleball Costumes/Outfits", image_url: "" },
      { name: "Jocks/Cups", image_url: "" },
      { name: "Leggings", image_url: "" },
      {
        name: "Shoes/Footwear",
        image_url: "",
        subcategories: [
          { name: "Shoes", image_url: "" },
          { name: "Flip Flops/Slides", image_url: "" },
          { name: "Toe and Bunion Spacers", image_url: "" },
          { name: "Shoe Laces", image_url: "" },
          { name: "Sock Shoes", image_url: "" },
          { name: "Video Promo", image_url: "https://fb.watch/x_RYDavz5-/" },
        ],
      },
      { name: "Skirts", image_url: "" },
      { name: "Socks", image_url: "" },
      { name: "Sports Bras", image_url: "" },
      { name: "Suits", image_url: "" },
      { name: "Sweatpants", image_url: "" },
      { name: "Sweatshirt/Hoodies", image_url: "" },
      {
        name: "Underwear",
        image_url: "",
        subcategories: [
          { name: "Female", image_url: "" },
          {
            name: "Male",
            image_url: "",
            subcategories: [
              { name: "Boxers", image_url: "" },
              { name: "Boxer Briefs", image_url: "" },
              { name: "Briefs", image_url: "" },
              { name: "Jocks", image_url: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Coolers and Ice Chests",
    image_url: "",
    subcategories: [
      { name: "Electric", image_url: "" },
      { name: "Regular", image_url: "" },
      { name: "Solar", image_url: "" },
    ],
  },
  {
    name: "Court Cleaning Accessories",
    image_url: "",
    subcategories: [
      { name: "Concrete Cleaner", image_url: "" },
      { name: "Leaf Blowers", image_url: "" },
      { name: "Power Washers", image_url: "" },
      { name: "Push Brooms", image_url: "" },
      { name: "Water Rakes", image_url: "" },
    ],
  },
  {
    name: "Cups and Coffee Mugs",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Decals/Stickers",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Detox Foot Spas",
    image_url: "https://www.healifeco.com/products/ftsap",
    subcategories: [],
  },
  {
    name: "Door/Dust Removing Mats",
    image_url: "",
    subcategories: [
      { name: "Dust Removing", image_url: "" },
      { name: "Pickleball Themed", image_url: "" },
    ],
  },
  {
    name: "Drilling and Practice Accessories",
    image_url: "",
    subcategories: [
      { name: "Ball Holders/Baskets", image_url: "" },
      { name: "Ball Picker Uppers", image_url: "" },
      { name: "Pickle Putty", image_url: "" },
      { name: "Suction Cups", image_url: "" },
      { name: "Tubes", image_url: "" },
      { name: "Barriers", image_url: "" },
      { name: "Bulk Pickleball Deals", image_url: "" },
      { name: "Cones", image_url: "" },
      { name: "Court Markers", image_url: "" },
      {
        name: "Electrical Muscle Stimulation Suits",
        image_url: "",
        subcategories: [
          { name: "Katalyst", image_url: "https://fb.watch/y7kNgRwqVR/" },
          {
            name: "Vision Body",
            image_url:
              "https://visionbody.com/blogs/news/my-journey-back-to-peak-fitness-with-visionbody-ultimate-powersuit?fbclid=IwZXh0bgNhZW0BMABhZGlkAasaG_IGe-EBHS_FQJ4yVDHXOvy-paOhkZiE86FikOlX1jI0eHTT16xKoMKUez8klR87WA_aem_tcvZ6cJXe4YyrdUpMgwzBQ&utm_source=facebook&utm_medium=paid&campaign_id=120214466147150481&ad_id=120218474426700481",
          },
        ],
      },
      {
        name: "Frequency/Vibration Therapies",
        image_url: "",
        subcategories: [
          {
            name: "The Vibe",
            image_url: "https://resona.health/?ap_id=dominickdecarlo",
          },
        ],
      },
      {
        name: "Magnets",
        image_url: "https://magnetsforless.com",
        subcategories: [],
      },
      {
        name: "Nets, Fencing and Temporary Barriers",
        image_url: "",
        subcategories: [
          { name: "Collapsible/Travel", image_url: "" },
          { name: "Permanent", image_url: "" },
          { name: "Portable", image_url: "" },
        ],
      },
      { name: "Pickleball Waist Bag/Holder", image_url: "" },
      { name: "Strategy Board", image_url: "" },
      { name: "Temporary Court Line Tape", image_url: "" },
    ],
  },
  {
    name: "Edge Guard",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Electrical Muscle Stimulation Suits",
    image_url: "",
    subcategories: [
      { name: "Katalyst", image_url: "https://fb.watch/y7kNgRwqVR/" },
      {
        name: "Vision Body",
        image_url:
          "https://visionbody.com/blogs/news/my-journey-back-to-peak-fitness-with-visionbody-ultimate-powersuit?fbclid=IwZXh0bgNhZW0BMABhZGlkAasaG_IGe-EBHS_FQJ4yVDHXOvy-paOhkZiE86FikOlX1jI0eHTT16xKoMKUez8klR87WA_aem_tcvZ6cJXe4YyrdUpMgwzBQ&utm_source=facebook&utm_medium=paid&campaign_id=120214466147150481&ad_id=120218474426700481",
      },
    ],
  },
  {
    name: "Electrolytes",
    image_url: "",
    subcategories: [{ name: "Pickleball Juice (Pickle Juice)", image_url: "" }],
  },
  {
    name: "Emergency Contact Tags",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Enhance Your Pickleball Game",
    image_url: "",
    subcategories: [],
  },

  {
    name: "Detox Foot Spas",
    image_url: "https://www.healifeco.com/products/ftsap",
    subcategories: [],
  },
  {
    name: "Electrical Muscle Stimulation Suits",
    image_url: "",
    subcategories: [
      { name: "Katalyst", image_url: "https://fb.watch/y7kNgRwqVR/" },
      {
        name: "Vision Body",
        image_url:
          "https://visionbody.com/blogs/news/my-journey-back-to-peak-fitness-with-visionbody-ultimate-powersuit?fbclid=IwZXh0bgNhZW0BMABhZGlkAasaG_IGe-EBHS_FQJ4yVDHXOvy-paOhkZiE86FikOlX1jI0eHTT16xKoMKUez8klR87WA_aem_tcvZ6cJXe4YyrdUpMgwzBQ&utm_source=facebook&utm_medium=paid&campaign_id=120214466147150481&ad_id=120218474426700481",
      },
    ],
  },
  {
    name: "Frequency/Vibration Therapies",
    image_url: "",
    subcategories: [
      {
        name: "The Vibe",
        image_url: "https://resona.health/?ap_id=dominickdecarlo",
      },
      { name: "Tend", image_url: "https://fb.watch/y6UkdDYNAH/?" },
      { name: "Vibrational Standing Pads", image_url: "" },
      {
        name: "HYPNOVIDEO™️ (Audio Program to Enhance Your Game)",
        image_url: "",
      },
    ],
  },
  {
    name: "Magnets",
    image_url: "https://magnetsforless.com",
    subcategories: [],
  },
  {
    name: "Sleep Cream",
    image_url: "https://sleepcream.com",
    subcategories: [],
  },
  {
    name: "Sleep Frequency Devices",
    image_url: "https://mindlycalm.com",
    subcategories: [],
  },
  {
    name: "Superhuman Protocols",
    image_url: "https://davincimedicalusa.com",
    subcategories: [],
  },
  {
    name: "Exercise Equipment and Accessories",
    image_url: "",
    subcategories: [
      { name: "Abdomen Balls", image_url: "" },
      { name: "Electrical Muscle Stimulation Devices", image_url: "" },
      {
        name: "Electrical Muscle Stimulation Suits",
        image_url: "",
        subcategories: [
          { name: "Katalyst", image_url: "https://fb.watch/y7kNgRwqVR/" },
          {
            name: "Vision Body",
            image_url:
              "https://visionbody.com/blogs/news/my-journey-back-to-peak-fitness-with-visionbody-ultimate-powersuit?fbclid=IwZXh0bgNhZW0BMABhZGlkAasaG_IGe-EBHS_FQJ4yVDHXOvy-paOhkZiE86FikOlX1jI0eHTT16xKoMKUez8klR87WA_aem_tcvZ6cJXe4YyrdUpMgwzBQ&utm_source=facebook&utm_medium=paid&campaign_id=120214466147150481&ad_id=120218474426700481",
          },
        ],
      },
      { name: "Foam Rollers", image_url: "" },
      { name: "KT Tape", image_url: "" },
      { name: "Magnets", image_url: "https://magnetsforless.com" },
      { name: "Massage Guns", image_url: "" },
      { name: "Pilates Machines and Equipment", image_url: "" },
      { name: "Pulse Electromagnetic Field Accessories", image_url: "" },
      { name: "Scraping Tools", image_url: "" },
      { name: "Stretch Bands", image_url: "" },
      { name: "Tens Units", image_url: "" },
      {
        name: "Frequency Therapies",
        image_url: "",
        subcategories: [
          {
            name: "The Vibe",
            image_url: "https://resona.health/?ap_id=dominickdecarlo",
          },
          { name: "Tend", image_url: "https://fb.watch/y6UkdDYNAH/?" },
        ],
      },
      { name: "Weight Sets", image_url: "" },
    ],
  },
  {
    name: "Fans/Cooling Gadgets",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Financially, How To Play More Pickleball",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Finger Nail Decals",
    image_url:
      "https://www.etsy.com/listing/1544172489/pickleball-girl-nail-art-decal-sticker?gpla=1&gao=1&&utm_source=google&utm_medium=cpc&utm_campaign=shopping_us_e-bath_and_beauty&utm_custom1=_k_Cj0KCQiAoJC-BhCSARIsAPhdfShf2Xfq0NS3yzqd2ta3KhOo6g6S2rmXYBnJ_G6V_0NXBiN8iGMKVGYaAuHOEALw_wcB_k_&utm_content=go_21792091386_169018404935_716715246389_pla-314548487700_m__1544172489_561441696&utm_custom2=21792091386&gad_source=1&gbraid=0AAAAADtcfRK66tWj9E7ZnBjuDMrpgo8OB&gclid=Cj0KCQiAoJC-BhCSARIsAPhdfShf2Xfq0NS3yzqd2ta3KhOo6g6S2rmXYBnJ_G6V_0NXBiN8iGMKVGYaAuHOEALw_wcB&load_webview=1&bid=jzcVFvXTGIRNU0USJ70CtHOPzt9y",
    subcategories: [],
  },
  {
    name: "Fitness Apps",
    image_url: "",
    subcategories: [
      { name: "Android", image_url: "" },
      { name: "iPhone", image_url: "" },
    ],
  },
  {
    name: "Frequency/Vibrational Therapies",
    image_url: "",
    subcategories: [
      { name: "Magnets", image_url: "https://magnetsforless.com" },
      {
        name: "The Vibe",
        image_url: "https://resona.health/?ap_id=dominickdecarlo",
      },
      { name: "Tend", image_url: "https://fb.watch/y6UkdDYNAH/?" },
      { name: "Vibrational Standing Pads", image_url: "" },
    ],
  },
  {
    name: "Generators",
    image_url: "",
    subcategories: [
      { name: "Electric", image_url: "" },
      { name: "Gas", image_url: "" },
      { name: "Solar", image_url: "" },
    ],
  },
  {
    name: "Glasses",
    image_url: "",
    subcategories: [
      { name: "Contacts", image_url: "" },
      { name: "Fashionable Frames", image_url: "" },
      { name: "Goggles", image_url: "" },
      { name: "Safety", image_url: "" },
      { name: "Sun", image_url: "" },
    ],
  },
  {
    name: "Gloves",
    image_url: "",
    subcategories: [
      { name: "Baseball", image_url: "" },
      { name: "Designer", image_url: "" },
      { name: "Heated", image_url: "" },
      { name: "Pickleball", image_url: "" },
      { name: "Racketball", image_url: "" },
      { name: "Weightlifting", image_url: "" },
      { name: "Winter", image_url: "" },
    ],
  },
  {
    name: "Greeting Cards and Stationary",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Grips/Wraps",
    image_url: "",
    subcategories: [{ name: "Rizz", image_url: "" }],
  },
  {
    name: "Hanukkah",
    image_url: "",
    subcategories: [
      { name: "Cards", image_url: "" },
      { name: "Gifts", image_url: "" },
      { name: "Signature Ball", image_url: "" },
      { name: "Wrapping Paper", image_url: "" },
    ],
  },
  {
    name: "Hearing Aids",
    image_url: "",
    subcategories: [],
  },

  {
    name: "Homes with Pickleball Courts",
    image_url: "",
    subcategories: [
      { name: "For Rent", image_url: "" },
      { name: "For Sale", image_url: "" },
    ],
  },
  {
    name: "Hot Tubs",
    image_url: "",
    subcategories: [],
  },
  {
    name: "ID Tags",
    image_url: "",
    subcategories: [
      { name: "Luggage", image_url: "" },
      { name: "Paddle", image_url: "" },
    ],
  },
  {
    name: "Incense/Diffusing Machines and Essential Oils",
    image_url: "",
    subcategories: [
      {
        name: "Mistefy",
        image_url:
          "https://mistefy.shop/products/umbrella-diffuser?twclid=2-1144qfpukr3crvjj588azdbza",
      },
    ],
  },
  {
    name: "Inflatable Pickleball Costumes/Outfits",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Jewelry",
    image_url: "",
    subcategories: [
      { name: "Bracelets", image_url: "" },
      { name: "Earrings", image_url: "" },
      { name: "Magnetic", image_url: "https://magnetsforless.com" },
      { name: "Necklaces", image_url: "" },
      { name: "Rings", image_url: "" },
      { name: "Watches", image_url: "" },
      { name: "Analog", image_url: "" },
      { name: "Digital", image_url: "" },
      { name: "Score Keeping", image_url: "" },
    ],
  },
  {
    name: "Joola Scrotes",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Keychains",
    image_url: "",
    subcategories: [],
  },
  {
    name: "KT Tape",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Label Makers and Extra Cartridges",
    image_url: "",
    subcategories: [],
  },

  {
    name: "Laminating Machines",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Lanyards",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Lead Tape and Weights",
    image_url: "",
    subcategories: [],
  },
  {
    name: "LED Pickleball Court Lighting",
    image_url: "",
    subcategories: [
      { name: "Hard Wired", image_url: "" },
      { name: "Solar", image_url: "" },
    ],
  },
  {
    name: "Lockers/Caddies",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Luggage",
    image_url: "",
    subcategories: [
      { name: "Ekster", image_url: "https://fb.watch/y7aKVGULnB/" },
    ],
  },
  {
    name: "Magnets",
    image_url: "",
    subcategories: [
      { name: "Magnets for Less", image_url: "https://magnetsforless.com" },
    ],
  },
  {
    name: "Massage",
    image_url: "",
    subcategories: [
      { name: "Chairs", image_url: "" },
      { name: "Foot Massagers and Spas", image_url: "" },
      { name: "Guns", image_url: "" },
      { name: "Hot Tubs", image_url: "" },
      { name: "Scraping Tools", image_url: "" },
      { name: "Shower Heads", image_url: "" },
      { name: "Tend", image_url: "https://fb.watch/y6UkdDYNAH/" },
    ],
  },
  {
    name: "Mattresses",
    image_url: "",
    subcategories: [
      { name: "Magnetic", image_url: "" },
      { name: "Pillowtops", image_url: "" },
    ],
  },
  {
    name: "Medical Devices",
    image_url: "",
    subcategories: [
      { name: "AFib Devices", image_url: "https://kardia.com" },
      { name: "Blood Pressure", image_url: "" },
      {
        name: "Detox Foot Spas",
        image_url: "https://www.healifeco.com/products/ftsap",
      },
      { name: "Electrical Muscle Stimulation Suits", image_url: "" },
      { name: "Katalyst", image_url: "https://fb.watch/y7kNgRwqVR/" },
      {
        name: "Vision Body",
        image_url:
          "https://visionbody.com/blogs/news/my-journey-back-to-peak-fitness-with-visionbody-ultimate-powersuit?fbclid=IwZXh0bgNhZW0BMABhZGlkAasaG_IGe-EBHS_FQJ4yVDHXOvy-paOhkZiE86FikOlX1jI0eHTT16xKoMKUez8klR87WA_aem_tcvZ6cJXe4YyrdUpMgwzBQ&utm_source=facebook&utm_medium=paid&campaign_id=120214466147150481&ad_id=120218474426700481",
      },
      {
        name: "Foot Fungus",
        image_url: "https://Norelie-RedRevive-US-AppLovin-AB",
      },
      { name: "Frequency/Vibration Therapies", image_url: "" },
      {
        name: "The Vibe",
        image_url: "https://resona.health/?ap_id=dominickdecarlo",
      },
      { name: "Tend", image_url: "https://fb.watch/y6UkdDYNAH/" },
      { name: "Vibrational Standing Pads", image_url: "" },
      { name: "Glucose", image_url: "https://uponide.top/products/bloodpro" },
      { name: "Magnets for Less", image_url: "https://magnetsforless.com" },
      { name: "Metabolism", image_url: "" },
      { name: "Lumen Device", image_url: "https://fb.watch/y1RQditfLx/" },
      { name: "Oxygen", image_url: "" },
      {
        name: "Red Light Therapy Wands",
        image_url:
          "https://norelie.co/products/redrevive-cold-laser-therapy-wand",
      },
      { name: "Scraping Tools", image_url: "" },
      { name: "Sleep Frequency Devices", image_url: "https://mindlycalm.com" },
      {
        name: "Superhuman Protocols",
        image_url: "https://davincimedicalusa.com",
      },
      { name: "Vegus Nerve Stimulators", image_url: "https://pulsetto.tech/" },
    ],
  },
  {
    name: "Metabolism",
    image_url: "",
    subcategories: [
      { name: "Lumen Device", image_url: "https://fb.watch/y1RQditfLx/" },
    ],
  },
  {
    name: "Needlepoint/Cross Stitch Designs",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Nets, Fencing and Temporary Barriers",
    image_url: "",
    subcategories: [
      { name: "Collapsible/Travel", image_url: "" },
      { name: "Permanent", image_url: "" },
      { name: "Portable", image_url: "" },
    ],
  },
  {
    name: "Nutritional Apps",
    image_url: "",
    subcategories: [
      { name: "Android", image_url: "" },
      { name: "iPhone", image_url: "" },
    ],
  },
  {
    name: "Nutritional Products",
    image_url: "",
    subcategories: [
      { name: "Electrolytes", image_url: "" },
      { name: "Pickleball Juice (Pickle Juice)", image_url: "" },
      { name: "Energy", image_url: "" },
      { name: "Supplements", image_url: "" },
      { name: "Vitamins", image_url: "" },
    ],
  },
  {
    name: "Orthotics and Shoe Inserts",
    image_url: "",
    subcategories: [{ name: "Magnetic", image_url: "" }],
  },
  {
    name: "Paddles",
    image_url: "",
    subcategories: [
      { name: "Children’s", image_url: "" },
      { name: "Engage", image_url: "" },
      { name: "Gearbox", image_url: "" },
      { name: "Joola", image_url: "" },
      { name: "Rizz", image_url: "" },
      { name: "Selkirk", image_url: "" },
      { name: "Training", image_url: "" },
    ],
  },
  {
    name: "Paddle Erasers",
    image_url: "",
    subcategories: [{ name: "Rizz", image_url: "" }],
  },
  {
    name: "Paddle Protectors and Covers",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Paddle Racks",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Paddle Suction Cups",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Pain Management and Recovery Accessories",
    image_url: "",
    subcategories: [
      { name: "Acupressure/Acupuncture", image_url: "" },
      { name: "Arm and Leg Compression Machines", image_url: "" },
      { name: "Bath Bombs", image_url: "" },
      { name: "Braces and Supports", image_url: "" },
      { name: "Ankle", image_url: "" },
      { name: "Arm and Elbow", image_url: "" },
      { name: "Back", image_url: "" },
      { name: "Knee", image_url: "" },
      { name: "KT Tape", image_url: "" },
      { name: "Neck", image_url: "" },
      { name: "Shoulder", image_url: "" },
      { name: "Cold Plunge Pools", image_url: "https://fb.watch/x_U7-0JIuW/" },
      { name: "nuviorecovery.com", image_url: "https://nuviorecovery.com" },
      { name: "Cupping Therapy", image_url: "" },
      {
        name: "Detox Foot Spas",
        image_url: "https://www.healifeco.com/products/ftsap",
      },
      { name: "Electrical Muscle Stimulation Devices", image_url: "" },
      { name: "Electrical Muscle Stimulation Suits", image_url: "" },
      { name: "Katalyst", image_url: "https://fb.watch/y7kNgRwqVR/" },
      {
        name: "Vision Body",
        image_url:
          "https://visionbody.com/blogs/news/my-journey-back-to-peak-fitness-with-visionbody-ultimate-powersuit?fbclid=IwZXh0bgNhZW0BMABhZGlkAasaG_IGe-EBHS_FQJ4yVDHXOvy-paOhkZiE86FikOlX1jI0eHTT16xKoMKUez8klR87WA_aem_tcvZ6cJXe4YyrdUpMgwzBQ&utm_source=facebook&utm_medium=paid&campaign_id=120214466147150481&ad_id=120218474426700481",
      },
      { name: "Epsom Salts", image_url: "" },
      { name: "Finger/Toe Nail Clippers and Files", image_url: "" },
      { name: "Foam Rollers", image_url: "" },
      { name: "Foot Baths", image_url: "" },
      {
        name: "Foot Fungus",
        image_url: "https://Norelie-RedRevive-US-AppLovin-AB",
      },
      { name: "Frequency/Vibration Therapies", image_url: "" },
      {
        name: "The Vibe",
        image_url: "https://resona.health/?ap_id=dominickdecarlo",
      },
      { name: "Tend", image_url: "https://fb.watch/y6UkdDYNAH/" },
      { name: "Vibrational Standing Pads", image_url: "" },
      { name: "Heating Pads", image_url: "" },
      { name: "Hot Tubs", image_url: "" },
      { name: "HYPNOHELP™️ (Hypnosis Audio Program For Pain)", image_url: "" },
      { name: "Ice Packs", image_url: "" },
      { name: "Infrared Therapy", image_url: "" },
      { name: "KT Tape", image_url: "" },
      { name: "Liquids and Pills", image_url: "" },
      { name: "Liquid Skin Blister Repair", image_url: "" },
      { name: "Lotions and Potions", image_url: "" },
      { name: "Magnets for Less", image_url: "https://magnetsforless.com" },
      { name: "Massage Guns", image_url: "" },
      { name: "Pilates Machines and Equipment", image_url: "" },
      { name: "Pulse Electromagnetic Field Accessories", image_url: "" },
      { name: "Pumice Stones", image_url: "" },
      {
        name: "Red Light Therapy Wands",
        image_url:
          "https://norelie.co/products/redrevive-cold-laser-therapy-wand",
      },
      { name: "Scraping Tools", image_url: "" },
      { name: "Sleep Cream", image_url: "https://sleepcream.com" },
      { name: "Sleep Frequency Devices", image_url: "https://mindlycalm.com" },
      { name: "Stretch Bands", image_url: "" },
      {
        name: "Superhuman Protocols",
        image_url: "https://davincimedicalusa.com",
      },
      { name: "Tens Units", image_url: "" },
    ],
  },
  {
    name: "Panchos/Raincoats/Umbrellas",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Pets",
    image_url: "",
    subcategories: [
      {
        name: "Bandanas",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Bowls",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Food",
        image_url: "",
        subcategories: [
          { name: "Hybrid", image_url: "" },
          { name: "Water", image_url: "" },
        ],
      },
      {
        name: "Clothing",
        image_url: "",
        subcategories: [
          { name: "Booties", image_url: "" },
          { name: "Sweaters", image_url: "" },
        ],
      },
      {
        name: "Collars",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Leashes",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Mats",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Peanut Butter Licking",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Pooper Scoopers",
        image_url: "",
        subcategories: [],
      },
    ],
  },
  {
    name: "Pickleball Apps",
    image_url: "",
    subcategories: [
      {
        name: "Main Court",
        image_url: "",
        subcategories: [
          { name: "Android", image_url: "" },
          { name: "iPhone", image_url: "" },
        ],
      },
      {
        name: "Pickleheads",
        image_url: "",
        subcategories: [
          { name: "Android", image_url: "" },
          { name: "iPhone", image_url: "" },
        ],
      },
      {
        name: "PickledIn",
        image_url: "",
        subcategories: [
          { name: "Android", image_url: "" },
          { name: "iPhone", image_url: "" },
        ],
      },
      {
        name: "Playsight",
        image_url: "",
        subcategories: [
          { name: "Android", image_url: "" },
          { name: "iPhone", image_url: "" },
        ],
      },
      {
        name: "Side Out",
        image_url: "",
        subcategories: [
          { name: "Android", image_url: "" },
          { name: "iPhone", image_url: "" },
        ],
      },
      {
        name: "Swish",
        image_url: "",
        subcategories: [
          { name: "Android", image_url: "" },
          { name: "iPhone", image_url: "" },
        ],
      },
    ],
  },
  {
    name: "Pickleball Game Analytic Accessories",
    image_url: "",
    subcategories: [
      { name: "PB Vision", image_url: "" },
      { name: "Swing Vision", image_url: "" },
    ],
  },
  {
    name: "Picnic Blankets",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Pilates Machines and Equipment",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Pickleball Vacations, Cruises and Tours",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Red Light Therapy Wands",
    image_url: "https://norelie.co/products/redrevive-cold-laser-therapy-wand",
    subcategories: [],
  },
  {
    name: "RV Accessories",
    image_url: "",
    subcategories: [
      { name: "Air Fresheners", image_url: "" },
      { name: "Pickle Fragrances", image_url: "" },
      { name: "Cell Phone", image_url: "" },
      { name: "Cleaning Supplies", image_url: "" },
      { name: "Door Mats", image_url: "" },
      { name: "Parking Cones", image_url: "" },
      { name: "Parts", image_url: "" },
      {
        name: "Pets",
        image_url: "",
        subcategories: [
          { name: "Bandanas", image_url: "" },
          { name: "Bowls", image_url: "" },
          {
            name: "Food",
            image_url: "",
            subcategories: [
              { name: "Hybrid", image_url: "" },
              { name: "Water", image_url: "" },
            ],
          },
          {
            name: "Clothing",
            image_url: "",
            subcategories: [
              { name: "Booties", image_url: "" },
              { name: "Sweaters", image_url: "" },
            ],
          },
          { name: "Collars", image_url: "" },
          { name: "Leashes", image_url: "" },
          { name: "Mats", image_url: "" },
          { name: "Peanut Butter Licking", image_url: "" },
          { name: "Pooper Scoopers", image_url: "" },
          { name: "Seat Covers", image_url: "" },
          { name: "Magnetic", image_url: "" },
        ],
      },
      { name: "Space heaters", image_url: "" },
      { name: "Sunshades", image_url: "" },
      { name: "Tools", image_url: "" },
    ],
  },
  {
    name: "Saunas",
    image_url: "",
    subcategories: [
      { name: "Saunas", image_url: "" },
      {
        name: "Sauna Jackets",
        image_url:
          "https://www.kewlioo.com/collections/sauna-vests-suits/products/mens-heat-trapping-sauna-jacket/?utm_source=applovin&utm_campaign=ROAS&utm_medium=paid&alart=40cba1b8-4868-4753-b247-7fbf0cda45e4&aleid=d049e802ba2bc47f63dc30a13bbc2022363c0034",
        subcategories: [],
      },
    ],
  },
  {
    name: "Scales",
    image_url: "",
    subcategories: [
      { name: "Analog", image_url: "" },
      { name: "Body Scan", image_url: "" },
      { name: "Digital", image_url: "" },
      { name: "Smart", image_url: "" },
    ],
  },
  {
    name: "Scoreboards",
    image_url: "",
    subcategories: [
      { name: "Analog", image_url: "" },
      {
        name: "Apps",
        image_url: "",
        subcategories: [
          { name: "Android", image_url: "" },
          { name: "Apple", image_url: "" },
        ],
      },
      { name: "Digital", image_url: "" },
      { name: "Score Keeping Watches", image_url: "" },
    ],
  },
  {
    name: "Shoes/Footwear",
    image_url: "",
    subcategories: [
      { name: "Flip Flops/Slides", image_url: "" },
      { name: "Toe and Bunion Spacers", image_url: "" },
      { name: "Shoe Cleaners", image_url: "" },
      { name: "Shoe Laces", image_url: "" },
      { name: "Shoe Racks", image_url: "" },
      { name: "Shoes", image_url: "" },
      {
        name: "Sock Shoes",
        image_url: "https://fb.watch/x_RYDavz5-/?",
      },
    ],
  },
  {
    name: "Sleep Frequency Devices",
    image_url: "https://mindlycalm.com",
    subcategories: [],
  },
  {
    name: "Socks",
    image_url: "",
    subcategories: [
      { name: "Designer", image_url: "" },
      { name: "Heated", image_url: "" },
      {
        name: "Magnetic",
        image_url: "https://magnetsforless.com",
      },
      {
        name: "Sock Shoes",
        image_url: "https://fb.watch/x_RYDavz5-/?",
      },
      { name: "Toe and Bunion Spacers", image_url: "" },
    ],
  },
  {
    name: "Solar Chargers for All Electronics",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Sound Proofing/Dampening Materials",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Speakers, Sound Systems and Microphones",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Steamrooms",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Stencils",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Stuffed Animals",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Sunscreen",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Sunshades",
    image_url: "",
    subcategories: [
      {
        name: "Car",
        image_url: "",
        subcategories: [],
      },
      {
        name: "RV",
        image_url: "",
        subcategories: [],
      },
    ],
  },
  {
    name: "Superhuman Protocols",
    image_url: "davincimedicalusa.com",
    subcategories: [],
  },
  {
    name: "Temporary Tattoos",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Toe and Bunion Spacers",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Towels",
    image_url: "",
    subcategories: [
      {
        name: "Cooling",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Pickleball",
        image_url: "",
        subcategories: [],
      },
    ],
  },
  {
    name: "Tripods",
    image_url: "",
    subcategories: [
      {
        name: "Handheld",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Regular",
        image_url: "",
        subcategories: [],
      },
    ],
  },
  {
    name: "Video Cameras, Cameras and WebCams For Live Streaming",
    image_url: "Josh’s Home System",
    subcategories: [],
  },
  {
    name: "Wagons/Flatbeds",
    image_url: "",
    subcategories: [],
  },
  {
    name: "Water Bottles/Thermoses/Shaker Bottles",
    image_url: "",
    subcategories: [
      {
        name: "Can/Water Bottle Insulators",
        image_url: "",
        subcategories: [],
      },
    ],
  },
  {
    name: "Water Filtration Systems",
    image_url: "",
    subcategories: [
      {
        name: "Individual Pitchers",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Reverse Osmosis For Sinks",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Whole Home",
        image_url: "",
        subcategories: [],
      },
    ],
  },
  {
    name: "Weight Loss",
    image_url: "",
    subcategories: [
      {
        name: "Alter",
        image_url:
          "https://www.alterme.com/shop/swab-kit?utm_source=facebook&utm_medium=paid&utm_campaign=%5BT%5D25/03/01-AP-Cold-CBO-HV-7DC1DV-Broad-DNA%20Report&utm_term=%5BT%5D25/03/01-Broad-Exclusions-PUR-US-18+-M%26W-Autoplacements-7DC1DV-HV-Post%20ID-DNA%20Report-CBS%201&utm_content=%5BT%5D25/03/01-Post%20ID-DNA%20Report-%7CCBS%201%7C-V2-IMG&tw_source=fb&tw_adid=120216203517140328&promocode=ALTER70&fbclid=IwZXh0bgNhZW0BMABhZGlkAasYABU91FgBHTiUWQZ-MdmEMI4781hnUXgb2iGsTNh9mpqQ4G_izkArB7fALkCddyilDA_aem_HiD-RAwm9okvyiEm75e3rA&campaign_id=120216199304820328&ad_id=120216203517140328&utm_id=120216199304820328",
        subcategories: [],
      },
      {
        name: "Belts and Wraps",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Electrical Muscle Stimulation Suits",
        image_url: "Katalyst: https://fb.watch/y7kNgRwqVR/?",
        subcategories: [],
      },
      {
        name: "Vision Body",
        image_url:
          "https://visionbody.com/blogs/news/my-journey-back-to-peak-fitness-with-visionbody-ultimate-powersuit?fbclid=IwZXh0bgNhZW0BMABhZGlkAasaG_IGe-EBHS_FQJ4yVDHXOvy-paOhkZiE86FikOlX1jI0eHTT16xKoMKUez8klR87WA_aem_tcvZ6cJXe4YyrdUpMgwzBQ&utm_source=facebook&utm_medium=paid&campaign_id=120214466147150481&ad_id=120218474426700481",
        subcategories: [],
      },
      {
        name: "HYPNOVIDEO™️ (Audio Program For Weight Loss)",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Lotions",
        image_url: "",
        subcategories: [],
      },
      {
        name: "Lumen Device",
        image_url: "https://fb.watch/y1RQditfLx/",
        subcategories: [],
      },
      {
        name: "Pills",
        image_url: "",
        subcategories: [],
      },
    ],
  },
];

export default categories;
