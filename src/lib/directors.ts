// cspell:ignore Dugan
export interface Director {
  imgSrc: string
  name: string
  alt: string
  district: number
  districtCaption: string
  viceChair?: boolean
  chair?: boolean
  termExp: number
  email: string
  bio: string
}

export const directors: Director[] = [
  {
    imgSrc:
      'https://imgix.cosmicjs.com/55199cd0-006c-11e8-9f74-c182a209ec69-Director_Gray_Allen_2017_Closeup.jpg',
    name: 'Gray Allen',
    alt: 'Photo of Gray Allen',
    district: 1,
    viceChair: true,
    districtCaption: 'Supervisorial District 1',
    termExp: 2026,
    email: 'district1@pcwa.net',
    bio: `Elected in November 2006 to the PCWA Board of Directors. He represents
      District 1, which includes most of the City of Roseville, plus portions of
      unincorporated west Placer County. He resides in Roseville. He is a long-time public
      relations consultant with clients in agriculture, high tech, transportation, banking
      and building products. He also held management positions in international and
      corporate public relations. He is a former member of the Planning Commission for the
      City of Roseville. Mr. Allen is president of Roseville Crime Stoppers, a board member
      of the Roseville Police Activities League and Roseville Library Foundation. He also
      serves on the Citizens Advisory Board of the California Highway Patrol.
    `
  },
  {
    imgSrc:
      'https://imgix.cosmicjs.com/c82f6720-e417-11e7-a3cb-3977faa7cc79-Chair_Alpine_2017_Closeup_01.jpg',
    name: 'Josh Alpine',
    alt: 'Photo of Josh Alpine',
    district: 5,
    districtCaption: 'Supervisorial District 5',
    termExp: 2024,
    email: 'district5@pcwa.net',
    bio: `
      Elected in November 2012 to the PCWA Board of Directors, Mr. Alpine represents
      District 5. This extends eastward from Auburn to Lake Tahoe and the Nevada state
      line. Mr. Alpine is a community leader. He served ten years on the Colfax City
      Council, including two terms as mayor. He works as an Electric
      Transmission System Operator.
    `
  },
  {
    imgSrc:
      'https://imgix.cosmicjs.com/ca563ec0-e417-11e7-a3cb-3977faa7cc79-Director_Santini_2017_Closeup_01.jpg',
    name: 'Primo Santini',
    alt: 'Photo of Primo Santini',
    district: 2,
    districtCaption: 'Supervisorial District 2',
    termExp: 2026,
    email: 'district2@pcwa.net',
    bio: `
      Appointed in June 2013 to the PCWA Board of Directors to fill the unexpired term of
      retired Director Alex Ferreira. Mr. Santini represents District 2, which includes
      the City of Lincoln, parts of the City of Rocklin and unincorporated Placer County
      agricultural and rural communities. He is a third-generation "Lincolnite" and a
      graduate of Lincoln schools and Stanford University. Since 1984, he has been an owner
      of Cornerstone Associates Insurance Services, Inc. located in downtown Lincoln.
      Prior to his appointment to the PCWA Board, Mr. Santini served two consecutive terms
      (2000 through 2008) on the Lincoln City Council and had the honor of serving twice
      (2003 and 2008) as mayor of his home town. In addition, he served as the council
      representative on the Regional Water Authority Board, South Placer Regional
      Transportation Authority, and the ad hoc committee working toward the completion of
      the Placer County Conservation Plan. He also was the chair of the committee
      responsible for the award-winning update of the City of Lincoln’s General Plan,
      adopted by the Lincoln City Council in 2008.
    `
  },
  {
    imgSrc:
      'https://imgix.cosmicjs.com/aa45fd50-440c-11e8-9090-4f91f013ee62-robert_dugan.jpg',
    name: 'Robert Dugan',
    alt: 'Photo of Robert Dugan',
    district: 4,
    districtCaption: 'Supervisorial District 4',
    chair: true,
    termExp: 2024,
    email: 'district4@pcwa.net',
    bio: `
      Elected in November 2012 to the PCWA Board of Directors, Mr. Dugan represents
      District 4.  This includes eastern Roseville-Granite Bay.  He resides in Roseville
      where he is a longtime community leader, planning commissioner and two-term chairman
      of the Roseville City Planning Commission.  He has worked in and managed government
      and public affairs operations at the local, state and federal levels, representing a
      variety of interests including heavy civil construction, public infrastructure
      finance, utility and aggregate industries.
    `
  },
  {
    imgSrc:
      'https://imgix.cosmicjs.com/c9f50bf0-e417-11e7-a3cb-3977faa7cc79-Director_Lee_2017_Closeup_01.jpg',
    name: 'Mike Lee',
    alt: 'Photo of Mike Lee',
    district: 3,
    districtCaption: 'Supervisorial District 3',
    termExp: 2024,
    email: 'district3@pcwa.net',
    bio: `
      Elected in November 2000 to the PCWA Board of Directors. He represents District 3,
      which includes most of Rocklin, all of Loomis, Penryn, Newcastle and Ophir. He
      resides in Loomis. He has a strong background in public service, having served
      sixteen years on the Placer County Board of Supervisors, he also served as a
      director of the water agency from 1973 to 1975. He serves on the Board of Directors
      for Sacramento Valley Teen Challenge, the South Placer Heritage Foundation, and the
      Lincoln Volunteer Center. He is a member and past President for the Lincoln Area
      Chamber of Commerce and a member of the Loomis Lions' Club. Mr. Lee is the project
      manager of the Twelve Bridges (master-planned community) in Lincoln.
    `
  }
].sort((l, r) => l.district - r.district) // Sorting is used by directors.map() in JSX block on dynamic [district] page.
