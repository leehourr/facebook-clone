import React from "react";
import { Dots, NewRoom, Search } from "../../../../svg";
import ContactItem from "./ContactItem";
import ContactOptions from "./ContactOptions";

const ContactLists = () => {
  const color = "#65676b";

  return (
    <div className="ml-2 mt-5 w-full">
      <header className="flex items-center justify-between">
        <h1 className="text-[17px] tracking-wide font-semibold">Contacts</h1>
        <div className="flex w-[27%] space-x-3 items-center justify-between mr-16 xxl:mr-10">
          <ContactOptions
            icon={<NewRoom color={color} />}
            hoverText="New call"
          />
          <ContactOptions
            icon={<Search color={color} />}
            hoverText="Search by name or gorup"
          />
          <ContactOptions icon={<Dots color={color} />} hoverText="Options" />
        </div>
      </header>
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />

    </div>
  );
};

export default ContactLists;
