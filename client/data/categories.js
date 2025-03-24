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
  // The remaining categories up to 113 will be added here...
];

export default categories;
