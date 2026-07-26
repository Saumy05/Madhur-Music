import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME || 'jigar';
  const adminPassword = process.env.ADMIN_PASSWORD || 'katukda';
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@madhur.com';

  const existing = await prisma.user.findUnique({
    where: { username: adminUsername },
  });

  if (!existing) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        username: adminUsername,
        displayName: 'System Administrator',
        email: adminEmail,
        passwordHash,
        role: 'ADMIN',
      },
    });

    console.log(`✓ Admin user created: ${admin.username} (${admin.email}) [role: ${admin.role}]`);
    console.log(`  Login with: username="${adminUsername}", password="${adminPassword}"`);
  } else {
    console.log(`✓ Admin user "${adminUsername}" already exists.`);
  }

  const initialSongs = [
    {
      title: 'Heeriye',
      artistName: 'Jasleen Royal ft. Arijit Singh',
      audioUrl: 'https://youtu.be/RLzC55ai0eo?si=IH0zEpZSvegR_9di',
      coverUrl: 'https://i.ytimg.com/vi/RLzC55ai0eo/hqdefault.jpg',
      durationSec: 194,
    },
    {
      title: 'Sheesha',
      artistName: 'Mitta Ror ft. Swara Verma',
      audioUrl: 'https://youtu.be/aRNfSqsgrgE?si=1qNVNrsjbnipvO6y',
      coverUrl: 'https://i.ytimg.com/vi/aRNfSqsgrgE/hqdefault.jpg',
      durationSec: 215,
    },
    {
      title: 'Break Up Party',
      artistName: 'Yo Yo Honey Singh Feat. Leo',
      audioUrl: 'https://youtu.be/EpJk_dSpjVM?si=_yheIpyuXXEl2a_S',
      coverUrl: 'https://i.ytimg.com/vi/EpJk_dSpjVM/hqdefault.jpg',
      durationSec: 228,
    },
  ];

  for (const item of initialSongs) {
    let artist = await prisma.artist.findFirst({
      where: { name: { equals: item.artistName, mode: 'insensitive' } },
    });
    if (!artist) {
      artist = await prisma.artist.create({
        data: {
          name: item.artistName,
          imageUrl: item.coverUrl,
        },
      });
    }

    const existingSong = await prisma.song.findFirst({
      where: { audioUrl: item.audioUrl },
    });

    if (!existingSong) {
      await prisma.song.create({
        data: {
          title: item.title,
          audioUrl: item.audioUrl,
          coverUrl: item.coverUrl,
          durationSec: item.durationSec,
          status: 'PUBLISHED',
          artistId: artist.id,
        },
      });
      console.log(`✓ Seeded song: "${item.title}" by ${item.artistName}`);
    }
  }
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
