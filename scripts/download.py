import httpx
import asyncio
import os
import sys
from pathlib import Path
from urllib.parse import urlparse


avatar_url_list = [
    f'https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_{name}.png'
    for name in [
        'PlayerBoy',
        'PlayerGirl',
        # Mondstadt
        'Qin',      # Jean
        'Ambor',    # Amber
        'Lisa',
        'Kaeya',
        'Barbara',
        'Diluc',
        'Razor',
        'Venti',
        'Klee',
        'Bennett',
        'Noel',     # Noelle
        'Fischl',
        'Sucrose',
        'Mona',
        'Diona',
        'Albedo',
        'Rosaria',
        'Eula',
        'Aloy',
        # Liyue
        'Xiao',
        'Beidou',
        'Ningguang',
        'Xiangling',
        'Xingqiu',
        'Chongyun',
        'Qiqi',
        'Keqing',
        'Tartaglia',
        'Zhongli',
        'Xinyan',
        'Ganyu',
        'Hutao',
        'Feiyan',   # Yanfei
        'Shenhe',
        'Yunjin',
        # Inazuma
        'Ayaka',
        'Kazuha',
        'Yoimiya',
        'Sayu',
        'Shougun',  # Raiden
        'Sara',
        'Kokomi',
        'Tohma',    # Thoma
        'Itto',
        'Gorou',
        'Yae',      # Miko
    ]
]


async def main():
    path = os.getenv('DOWNLOAD_PATH')
    if path is None:
        print('Environment variable DOWNLOAD_PATH not specified')
    realpath = path
    async with httpx.AsyncClient(follow_redirects=True) as async_client:
        for i in range(0, len(avatar_url_list), 10):
            avatar_url_slice = avatar_url_list[i:i+10]
            tasks = [ async_client.get(avatar_url, timeout=20) for avatar_url in avatar_url_slice ]
            res_list = await asyncio.gather(*tasks)
            for x, res in enumerate(res_list):
                if res.status_code != 200:
                    print(f'Failed to download avatar {avatar_url_slice[x]}', file=sys.stderr)
                    continue
                resource_name = urlparse(avatar_url_slice[x]).path.split('/')[-1]
                #print(resource_name)
                fname = os.path.join(realpath, resource_name)
                with open(f'{fname}', 'wb') as f:
                    f.write(res.content)
                print(f'Written to {fname}')


if __name__ == '__main__':
    asyncio.run(main())
