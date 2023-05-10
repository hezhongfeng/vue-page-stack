<template>
  <div class="index">
    <div class="desc">
      <div class="logo">
        <svg
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          id="svg282481"
          viewBox="0 0 1024 768"
          height="768px"
          width="1024px"
          version="1.1"
        >
          <defs id="defs282485" />
          <g id="logo-group">
            <image
              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQVR4Xu1de3xcVbX+1jmTpBVokLYgvkF5CIgozwqESdI2k0BFBHoRL6jghSv0lbbpI5lJJpkkLX3SFhDl4hVBkacitHm0yQwF5SGo9AKKD7wiAlJ6oS2lTTLnrPvbJzNtKE3mnDNnzzmTOfNP/+jaa+/97b0ys/de6/sI/sdHwEdgWATIx8ZHwEdgeAT8APF3h4/ACAj4AeJvDx8BP0D8PeAjYA8B/xvEHm5+qwJBwA+QAllof5r2EPADxB5ufqsCQcAPkAJZaH+a9hDwA8Qebn6rAkHAD5ACWWh/mvYQ8APEHm6Ot5rSHf2oxoFTmfWxrCgvT3zn2N/dN3265nhHvkNLCPgBYgku540r17cfq6vacgBf2c/7KwREy57U7ohGo7rzPfsezSDgB4gZlCTYBOPRg7FHaSCieQCKRujiaQLN7A2Fn5YwDN9lBgT8AMn1FmGmYHfbdAKvBONj5runHxZRcnF3VfRN8218y2wR8AMkWwQttC/vbDmRoawjcLmFZkNNtzPQtHPC4bc8e9q1AzZ9+M0sIOAHiAWw7JpO3ri0VEsONIEwC4Bq18+Qdi8o0Gf2hJriDvjyXYyAgB8gMrcHM5V3xa4AaBmAI5zuionvCyja/E1Tml9x2rfvbxABP0Ak7YRgd9sppOk3gXC2pC7SK7gbjCVcoi1PlEf3SO2rAJ37AeLwold1Rg/rh9oC4LsAFIfdj+TubwDVxqsafgkizmG/o7orP0AcWt5oNKokzlKuItASABMccmvDDXWBeXa8OvKSjcZ+k/0Q8APEgS1R0dl6hg6+iYDTHXDnhIskM984lvVYR010hxMOC9WHHyBZrPy5G9onFil6O4Ov9uh57g0CLeitarjL/9llb6H9ALGBWzAeDaBPvZaAVgCH2nCR6ya/Jigze0MNv811x/nenx8gFlewvLvlbOh0M4AvWGxqxvw9AH8DcKIZY4s2DMIPuF8LJ6ZF37LYtmDN/QAxufTndrYdGYB+A4ArTDaxanavRjT/iO3HvrZt3EtXMSAO++OtOjFh/zYDEZRo30+UR5Mm7AvaxA+QDMt/6jPfLxq3detMEEcBHOL8buEXiWhmb1Wkd6jvcx5Z8uFAQGsh8HWSroufI6JZvVXhzc7PafR49ANkhLWs7Gwu10E3AXSChCXfCabojokT142UV1XZ0XayTvo6AGUSxiBc3k0DVNc7LfxPSf7z2q0fIAdYvrKu1k+ozCsATJexukS4a4CVBY+FGl435V9kAHfG/o0UWmEtA9iUd2G0i4haS7RxqztqZvWZblUAhn6ADFnk6g1rS/rUHbXMHAHwIQnrv0UBz+gJNT5mx/fUruUHDfDueoDmAyi242PkNvQXgObEQw3rnfednx79AEmtW7AzFlKAtQwcI2Ep32Eg7NTBONgZ/awCdTUDF0gYKwBez9DnJELRv8jxnz9eCz5AyrpiR6nMqwG6UMqyEW4vglYvo9CpvCNWA6I1AH9Wwtj7QVjJxVp7ojz6rgT/eeGyYANk0r2rxpaU7lpAjEUAxji+WoxnoPCMeFXjU477PvDPwjCAgxzvi/BP1nl+IhS5pxBf4wsvQIwajTZBkHAjwJ92fEMB2whYPH7HcT/MJStJxcOtH+MiFnUnl0uYk3C5WWFlZk91wxZJ/j3ptqACpKw7doyi8xoCVUtYDZFifmsxtHBXKPp/EvybclnZ2XKuDhLXwjJe+gW7yveKoTW6OUdTQDhkVBABYtz+YE8DGIJBxPHbHwaeUKDM8Equk8gVoz3KNSASuWIfdmivDHWzDcT1E7Yff3suvyUlzCOjy9EdIMxU0dl2CROvAvDxjGhYN3iTiRYEn0je6UXuquDD0QlUrLaCcY2kbOPfKswzeqobn7AOXX60GLUBUrmh/QSdtHUgVEhYCo3B6wJqcXTTlEXbJfh31GXZhpYvqkQCC1nlvz9OQllk+uHT0dnJdTbqAqR6Q3TcHkVpAkgwiAQch4/wqJbkmZvPb/wfx33LdDj4Gv8NIoNA4kgJXe0kopbx25Nr75se7Zfg3xWXoydA9m0AQeP5EQlovsbM8/L9uvPsh244pHhMfwSMORkYHe1C+BIpmNU7NdJt14GX2o2KACnvbPkCjKRCnCMB3AGAV3OJHhtND2blHbHjQOKqGyEJmInX+Ic0otrNVRFR35K3n7wOENkp4QzaCFJmJarq/5i3KzzSwMWbUGfrNIBWg/hoCXMUiY/LDh7Qlj48LSqKwfLuk5cBYjCInKl+mwhLJTGIvAJGbTwU/nkhvB4H49Exyp7AfFa4HoyxEnbxK0yYl5gafiDf8My7AKnsaDldJ+Pn1BkSFjLv/+Jlg8nkjU2f1LSAOMNJSfMHoxfEs+KhxheyGWcu2+ZNgBh3+kVqO4DvyLjTJ+AR6JjTWxP5ay4XwIt9DRaKKWsBnCRhfMYVOUr05kR59B0J/h116fkAufTee9VtpS9dw4w2Ka/CTC+zwrMTVZFHHEU2z50NvsYHrgOxYIkslTCdN0G8+Lwn9B958ZE1PV9PB0hFV+uXmVkwiJzi+AIRdpNO7fqY5Aqf03Z4dKd2RQ8fgNoOxlUyvrkBeFogyJMBElwf/QipqmAQudLxwDAc8gOkKfN6zw//XY7/0ec1dfYTSZBnypmdNwWCPBUggkGk9K2t1zO4GcA4CQsxqh6xJOAzosvB20PlSiISf7wOl9C/5wSCPBMgwY5YkAjidkoGadouMJon7NTWjKY0CAkb1JTLIYJAM6Wk8wAvEGHW/lRIpgbnsJHrARLcEP24oqrLmXGZw3NLu/NpbSQBaySEKvpagCtldEGM+5VAcp6bAkGuBcil90aLt45Ta0mw/MkoFQWeh84z4jWNj8pYPN9nCoHB1/iLQBAlBZ9yHBeCqwJBrgRIeUdzFYjWAnSs44ACOxho9IUuJSA7gstpD0c/tCugLmDCQik1/gZnce4FgnIaIMGO6KcVMuhqvipj+Qj0IwrQop7JDf+S4d/3mRkBscZE6koAX8tsbceCupiUObnKj8tJgAgGkTHj3qsDeLGMvy4E/A5EM3qrwr+2A7nfxnkEKruap+hs/Eo43nnvyJlAkNwASWeLDqZVHyUBqLcJXD9+x/G3jfbaaAnYSXcpn/gbhkBQ2ZPJn8h6jZcWIIL9j0hdA0aNhJVgMN3GyWSDr3UhAV2HXRoPv4q6FIRvOuzacCeTNMPxABEMIknes5iBOhkMIgCeYoVmJKaGn5EBtu9THgKVHS2TdFEbD5wqoRcpfzSdCxBR8trdejGxcd33CQkAvAXihV5PbpMw71HlMgdqwI4KBDkSIGUbY59TNfGXQcqDkc6gW5JJtfHxCxa/Pap2SwFPRlSDFqnJZhCulyQQtGVQmCg7gaCsAkQQABQV9zUSkSAAcJ5BBHgc4BnxUONzBbyXRvXUy9a3fF4N0DowzpM00btZ1xYkaqKv2vFvL0CMn1NtlxOzqD6TQSHzBhPNT0xt+Gm+lWjaWYSCbzO4n6bToGiRDII/kYvXNoZLV1kVCLIcIOWdLScy6HsEnCthYZMErCnRtZaOmugOCf59lx5GIAcXPFtogGqsyM1ZCpDBFBHlFzIe+0S9ssLqzJ6a+hc9vIb+0HKAQMWG2Gd04tVENE1Cd1vG6KVnmP0mMR0gIuuWFFUU2ztdp/EqMc3tDTXc7/+ckrAd8thlRVdbNVhf47jqF9PseHVY1Nxn/JgOkPKO2FoQRP6/U58BEFYUYUxbd1XdLqec+n5GFwJCN3K3sn2Ok1nfDPwmEYqYYsUxHyCdrX9zUHCmU9HU2T3n1/9pdC2nPxtZCEzpjn40qanLQPiGA33siYcipvi/LARITIinmLYfbhIEntlbFbnZ/znlwDIXkIsUvazI6Qs6MO2+eChiSnbP9IYv74ztBHBw1oMbLIBZwSXastHEdZs1Lr6DAyJgsKqwKoSAnORDezYeipxmBnILAdK6yeGX8teYqN6r4jNmwPNt5CEgKk63lQZmpTTrnb0YIsyNV0VWmxm9lQC5GOD7zTi1ZMN4hkG1ierw45ba+cajE4G9JRK0UpK89fNcop1ulgvNdIDAUIeN3QfQxTJWRhToJxUsyHe6fBnYFIrPYFfbScS6+Ms+WdKcn9eIajZXhf9h1r/5AAEgrtz2KDtuAViw7Mn49BOwukTX2v2XdBnwetPnoJZioBnM/ykpcVFILyzlEm252W+ONFKWAiTdKCU1LG4UviQJ8jcJCOdaa1zSXHy3wyAgKg4PeevN6wiIAjhUElB30gAttpJeMnQctgJEODDy+icFriDmJZISFkU3W4hQ6wUCMUmLV7BuxSs5s7ZKUs26eJB4EuA58arGp7IB2XaApDsNxqMHU5+6AIMVhKbulq0PmB/SFKrbPDXyZ+tt/RZeQiDY1X48OLmKQNVSxkX4J4MWBp9I3u1EnXrWAZKeZEp8RXybXC5l4oDQClyX0gr0vK6EJAzy1m1VZ/SwflKawHSdpNqhPQAvK6Kxy5xMXXIsQPZ+o2xoPYtUXg3GWZJWcxuYG3mM/oNEeTQpqQ/frUMICJ0R9KnXEiB0Rg5zyO373BDhZ4qSXCiDotTxADFGzkwVnW2XMbFgAZdRny46eRHMc+PVTV0yQPd9Zo/AIDeWIq5tZRCSiwE+C4Vnx6c2/ir70R7Yg5wASfU1SEcZmMvEiyTx74LBHbpK8zZPifxBFki+X2sIlHXHjlE0XimpnkMM5g1mXhx8Sv+xE+eMkWYnNUDSHYtMTE0PtDFY8CLJ6FMTVY5qQIn2TK7fZm05fWunEAjGo4cqfWqYgVkAipzyO8RPnyDJ7t9TvORXFy4UuYHSPzI267CDLu9qOZWZVksq1xX9vkOg5vE7krf4OiDS987eDoSO5NZDXvoOEWIAJsrpmR/QiOpynWmR0wBJn0/Ku9q+BhiEDzLoSMVX1J9BNK93asMjflq9nO2a9ppSxBWPxidL6uk5ZsxJVEcSkvyP6Db3AZIajhCvp77ALIDDAA6RM3nqUZjm9lQ3bJHjv3C9Vm6KHq1pygpiukgSClsJaHA7m8K1ANn7F2hT2xH6ALeAWOT7KxLA1sH0X0VKMtJdFX1Tgv+Cclm9ITquT1HrGaiVRC07wMxrAoHi1k1TFm13G1zXA2RvoHS0nawTr3K45mQovjsAahujj1tjltHC7cXxUv+pc8a3iAy9+iMkje2XmoL5XsqY8EyApM8nFd1tFzDrKySpTwFML4OwIF7V8KB/PjG3zUVyKoMEu8gXzbWwbPUCA3MSocgmyy0lN/BWgKQma1STjQtcx+AmiVmemwlKbW+o4beSMc5b90ItCoqyjJgulTQJz2dFeDJA9p1P2sdrST1K4O8CUCUsEgP4URJKw2Ohhtcl+M9LlyIBVelTFzEwH0CJhEkkGXxTMlnU4nVCck8HSHphDPZ4HSskifGIbnYxYUnf9oNWPTF97m4JGyIvXIoShkfPUv4dIJF0+lEpgyZsYKjzcqUxmO0c8iJA0pNMqeOKGoITsp34MO1fIaZFvaGGnxXa+SQlbiPeM0wRqlnHn/9ocA+EIp3W27rXIq8CRMAkskNpj3INiER26HgZ0AlJLyKuzbbYRsbYnPZZ1tX6CZV5qcQyhXfA1LRj4sTvPXvatQNOj1+2v7wLkDQgIu+H+pQIQIIOVUbejxC/+4mm0GIrRf6yF8wp/yKRdGexWkfAQjBMsQxa7FsDcKsSUJvyOT8ubwNk7/mkO3ZMQMcyWdrrMIjueLnThTgWN5tz5oPsNF8HSJQiyNDiAIM2EvTaeKhRkJ3n9SfvAySNfkVXrIIH9RG/IGlF8p7orrKj5XSNaA0Bk2Rg5JUcOJHGhH51MhgnEogZvGWsXhq380BsK0AqOlvPYNK/wax8PgX0C0T6XW7/Zjdee8f98dsEEq+9h8vYBMhDojuD+FlXxc3UlVIwAXYw0DJxh7bOzSzqIedTwZKyf1bx68Q0u7c6fJ8VDCwFiJFguEe9dTi9awJ+oUOrS4Sif7EyCKdtRb7QblIWE5HIF5Jxjw8mvk8HLcx1+rUVrCbdu2psSemuucRYLKlgzTN5bsHO2GTBqQbgpJEwMsjTQ403mcXRfIAYOnKxB0xkbw4QsFYv0VoT5VFXyRXKumJHKeAbJL4E9zHz6rGsL/EU0d1gyfMlTEZJwafMbgaLdgmDVsdlgVVRvWi8kQFfMTl+jUk5JVHV8LwZe9MBEuyKXUIMK19PbxGhUS/WbnObXCHY0XoOgVeDYIrR2wxw+9n8i8HhiTuO/+/7pk8Xtzeufco2tHxRUYxzhgwNSSOXjYD5vaGGX7j5VjR549LSZLI/TESzLd9iMu6IV0e+ZWaRTAdIeUesB4QKM073s3kBrM9zm1whJ6/EwHMK9NqeUFPcBk5ZNQmuj36E1EAbwN+WVNb8LgOtKNHWWKXvzGpi+zUW58y3Sv94NZiEJILd6sVX46GIKTIRcwFiXA22ihrgg2xP1iMpBkJJdYB3LwBRnaT7f8G4kjOiuyESZQ2SCs8YoP9mLdmQOD/6hu31d6BhsCMWJIJ47c/2prI/HoqYOptaCRDx08Gc/fBgaGDcohSpzW4/HhkvyDovcUjS60Azlkt0N3jO+CoDK0B8tAP770AuHgcZ9J3PSvJvyq2oXtSTqjhPfc1Ug8xGDn+DACjvjL3sYA352ww075xw+C1upx+Ud7WcmSKSkPI2AOAtMDc5SXRX2dF2skZ8I4HLM+8FWxavMNGCxNSGe908Z5z90A2HFBX31RPRXCerF4lwV29V5AozyJj+RqjojN3IgDgQOfjhPzHRvMTU8Ho3F0IQ3QU7Y/9GZLwuf9LBCQ5xlT3R3bkb2icGSG+VWJ5syATs2XHQCjezmsV5cfNZ6jcZaAfwEYfXQ2dFOTUxteH3ZvyaD5CHWz/GRfyiBJ10Mc5NmsZzN5/f+D9mBi3LJgfvBuJH6gajrNQC0Z0oINs6Tp1JQKMk/AWkWckEOLUmxo0j8RpZ0hpEVNdbFRbXwqY+pgNEeEtRSf4CwIdMebdmpINwWxG0RrfJFc7tbDsyAF28xourQEsYmZyyubOYOGd0t10A5pUMHGPStzUzh2QCrHX6QeuK9a2fYpWXAZiera9h2r+derf5sRX/lhdf0NeTrt1s88rXzNh2gNE6hkvX2smdMdOBWZuKzrYvMemrwDjPbBuLdm8TqOVARHflnS0nMpTVBJ5i0ac5c4dlAsx1+kErcavYj92LiElUL8qQz8iKddNygBhTTAktEmGFtL9sglwBXBcPhX/u9vmkvLP1IoCWy7st2ncWq+xZcpie1JoBCDkyGWXGUmQCrAbI4Dkj8A2GUYsip3qR0Q3iudlkFdsLkBQaOSFXIDxKrMx1m1zB0Gek7bNAEER3zsoS79tdQulXMKF/2OqGM2MvUybATP9pm6CQyFBYvGecaaWdWVuRVawT5jpx+ZNVgOyd8MPRCSgKNBUCuYIQtu/nQDOBr5FEdGd2H1ixky4TYGYwwQ3RjxOpSyW+PW0HU8uEncmbnMoqdiRA0uBUbmg/QVOSK6TJa3mIXKFsfcvnVZVE/YksyWIzey6TTc5kAkYaiKhefLcoMB/ghTIveJKaGnmspn5rJlCs/L+jAbL3G6UzFlKAVQx8zspgLNi+wswLE6HIPW6fT4LdrecT80ppRHcWQBlimnOZgAMOMwdCSgyKq0xzZPEvSwkQAdYQ6S1x4BzV5ApD5IwF0Z2U84P5OHFHJmD/8YnqRZ1InDO+bH7sFixzlFUsLUDSUz3nkSUfLgoMhAESoioBCxCYN/UIuULlpvbx+oDWBIIQqpRxAzUSJs9B59nxmsZHzQPnvKVRvaip7cMV1TnQo5FVPFYvvTEXzwDSAyQNyGBhiyjgoQsdAOmDLjxErmC8FXFS8AufL2Wu73f6JoMb3K5FSclZzAW4Pqus7+EBcyWrOGcBkp53ilxBlEbKElx5DeDF5z2p3yVbvy7T5q/ojk1l3SCSkCFiOQDCjapS1OaqTIBRadp6MTEtB/jTmTCx+f+PE5TZblz15zxABEC5IleAynNkKqCaWWxxFlP61f9gNmSQJ5hpk9mGH2Lo892u/RfVi6pinDPKMo/ZlsUrxmNxVeQ+ty5jXAmQNFQ5EGMRXd3LrC1MVEf/19YSOdRIEN1hj9Jgq0R03xieB+tz4tVNPQ4Ny5abyk1tR3CSWxl8taRctfeIacnunR9a6WZWsQDH1QDZez4pIHKFYGf0syBDUsCKdNk2IkTcru8fkk0QkVS9KLaEJ7KK03vTEwGSHowQatFB4nxyqq0/bZkbeYZcISV+Kc4np4wwbG/IBAyeMy4kNthDPpMZZhsWHskq3n/kngoQMTiRxJaYFLiCmEWxjJwkNhfJFYYuwBBZM1HnMbRQiwl4SCd1sdsyAYMZA8pqadJ4qazixNSGn7p1zhgpnD0XIOnB5oJcwStEdymmjlMYdBTpeI917bduEySI6kVV0Vsk5px5Iqs403edZwNk3/lEPrmCV4juMi1WLv5fZGi/VapeD4bICiiV1OfdqppctGlK8yuS/Dvm1vMBkp6pIFcA6EYwznJs9u935BmiO0nzG9nt4DlDbl4Z4xlSaHZvVfjXrszRRqd5EyDG3PaRK4jSTFPEXzYw8QTRnY1x224isrB10gTz5FTbTkZu+DoTLQ4+kbzT7cdbq/PLrwBJzc6r5ApWwXfbvqozelgfjNoWWSKpfQCv5BJ9SaI8+q7b87XTf14GSHqiKVp/QUHpLrmCHeRdbCOyj0u3vfmfzBCZ1lKyj4lxf1LBAi+z35tZgrwOkPQEDXIF6OL9RFbKw7DkCmZA9pKNEEIlUlZLrNX5PXSe43ZWscBcPBmk/tXtroHtADHSDTTdSMLTk9qLbl9LpogkLgIZj1lH2QUkw0nWG0R3NiZX3hE7DmQUdsnKMPZKVvHBtEedmSrrFQV7DOB5Bu5EiXazVeJtywFS3tnyBUBZeYCHo00Kc31PdeNvbKyfY01ylA7hCaI7M6AZYqd71EYQhNipjHocI6t4jKa1uqmRMuSBWShpHTkMNs+zrlUnaqKvmsFO2FgKkPKOWA0ID2ZQbbqTda3eyiDMDtaKnSBXGIDaAsZ/SCJX8AzR3YFwMbKI+5TvMCjmXBbx/j15I6u4oqv1yzoLrmKcbmKPbBmjl55httjKdIAYjBSK+gcAB2ccBGE3Azcc0q8tf3haVPC9uvbJAbmCZ4ju9p7JumJCx+VGZqQ1JJ3G3xNZxSmNd8Gn/HUrE7Qiw2Y+QDpb1xF4hpWBQOTZ6Lwo+JT+U1fvv3PyCEYvg7AgXtXwoFs5RSJTWIG6XJokNrCNwGG9RP8vN1XDBEvKroC6gBUssKnx8lQ8FDH14Gw6QMo7Y6KewpbeHQO/UYjmuP2CmiKB/i4BQgX1UEvBbt54M0GpzWX1m6ir2aOqYTDmWJYjMzevJBjreIzW4qrupPGHru1yYoONMRuN913xUCTzLyHTZ5BBhSnbV2VD1uAe0mhh7/nhv5tbFzlWOSBXEDcnP0pCaXgs1PC6nFnkqDITvB5M8+LVkZdkzcOM30HpcV7jUKrRu/FQ5BAz/Vr5BhESbKaiLkPHxutqf1/J0l9duFD4dO1TtjH2OUMhlVEjaRC7mLCkb/tBq5yujKvoai1jNmQCRqonsT0tAv7ArNe6rS1ZMSi7IW6mTAnemJzw0/FQxBTtqZUA2egwi+AbIG6YsP34O9xWhhWPZyDBkkgnmATYqpljRHdC2jqgYxkTLrE6CJP2bxOhafv4w291U/1LpBONPeS9eUwsNN4dldsgwqzeqsg6M3iYD5CO2NdAeMCMU4s2v2dGbaI6krDYzlHzIeQK4lrUc0R3Qo6seEz/YjCEHJkpAUqLAGUlE2Cxr+HNjZ/zsUsBEgmpts68GcYi55rXeKnuav2ZLIETJv65olFdb03kr46BbcOReFhT+tQwA4LorsiGi8xNLBDdGQ9gZypXEpH4meG0HNngWB2QCcg86cwW5V0tp4INlpRzMlvbspD7UJgqplkLxrW2hpe50YD4XR0IFLe6yvUkqFNlX5maILor7245GxrdCMJpmaGzbuGkTID13ve1GNR4V0WJtaykU0N7kUu05dJTTcS0xMslM4vkwDOyAWaEtp4pXkqRK4i5ZqvNPdx0P0B0N3lj0yd1PXADMy6ThK/jMgF2xinYGJX+wBxmFhrvTlwAHWgYWbGkmD6D7N9zKvfl6w7cSY+E7QukYG7v1Ei3nQVwqs0QcgWhW3iEU37f54fxDKAvAlEZiOpsPoBlGpqRHiNDJiBTx++fK5Oh2iUzsdQhlhTbAZKecA60H8SP5PVMgfluM3zk4KBsaZ9ZMZYtE2B2LIPJrsY5I2i2jSU7h7UXsw6Q9OBT99Xid+SVliZk3li85n5PKVKbeybXbzPfzHnLYEf000SqyAGSpcjq3KBzJBOQacBG8qgeiEnUeJfCkuJYgKQBMnQhBPkb4exMoNn8/7cZaN454fBb3LynF2M3NL3BYq5SDtE28Uk3y6lMwHBjzYXGu0ztRccDxABqUFnoEiYsk8j4/RIT5jsh1JjNRsyJWqu1AboiE/CBIaaUkEEkaoc+a20KJq3FuU0yQbmcAEnNLxe3FAzaCKK5iaqG503CKsVMEN0l9T11WWSYOjEu12QChg4+2NV2ErFRAi1LvzFnLClSAyQNmrjnVtRATCIbuGeKl0TdjKKqS5jx707seJM+/k5Mdb2hhvvdSrU3fnI+HJ1AxYFmMAuNd6Me3OFPzllSchIgewOlu+0U6LyKwOUOA5d255niJZF9qsOocpskaa7CrbRkSCtjHqLRKK2MwC2WlJwGSPp8Ut7V9hVAkCvI+m1KLxvCK6Hwz938i2oQ3XW3TSdmkVc0lJzayv4bzvbHAUVbvHFq9DUnnNn1UdHVVs2siUTP4+36yNDOVZaU3AdICg0jbeWQwAwQC2ZzORywhCJ0/90AAAfASURBVEeJlbm5LF460GKLzNQx496rdUK/j4EnFNCc3lD4aUkb0pRbocMITq4iULWpBtaNPMGS4lqA7P3Zte93q8jvkqEMm5PiJTPrf25n25EBcCvA3zZdrLbP8asAL4xXRe5281tRqBYXB5JNDFw/mllS0rC7HiDpgZR3tpyYohOqMrPZbNh44ve6GLeh7afSajDOyzgPwm7SsSygjFneXVW3K6O9JIMhuvdCa/EwOd14gyVl6Nw8EyDpQYnftGB9pUTmP8eKl7LaJINvRV9lcRYjPnoYX3drRAs3V4X/kVVfWTau7GqeorMQ0ZGi1itG5wmWlAPB5LkAEYM0uGPf+te1DBLcsVL+Wonf8kRcG69qfCrL/ZNVc0F0t1t55woiugiMzxDwHjP9hlXclpgafiYr51k2Ftr2isYriWhalq6Ga+4JlpSR5ubJAEkPWPzeDQQGGgkk6IZksAKKYqGfaAotdvuvtKQNaMvt5I1LS3VtICKxaMwbLCkm0PF0gKTHX7m+/VhNSa6Q9pfMRPGSCSzz3iSV1v8dIoiy44lyJuQNlhSzc8uLAElPpryjuZIUZbVExsDXmKg+H4VezC74cHapwjCRhn5ytr6G+S3vCZYUq3PLqwARk0sJXl4NJqELIuevHOMZBtUmqsOPWwU03+wrN0WP1jRlhUXddivTfJvAjdsnHPF9t7OvrQw6bZt3AZIeuPidrGn99QAJNsFiO5PP1Mat9IZM43Li/0XxV0lJfwMDtZLw08C4pZi0aFco+n9OjNkNH3kbIHvPJ5uiR/OAeoNEnqh+AlaX6Fq7m/T+Tm0OkZ7/6CTlW2ASxW1yyodBXYquzO2pqX/RqXG75SfvAyQNXIppUNzVf0kSmG8SEB6/47gfuk10Z3d+lZ0t5+qD5a6SMOI/AerceFX9Bjdf++3iM8zZyUl37voawiEl/joOJ6KS7SC3EKG2tyrSm62jXLWvWN/6KVaNhElZJcLbQWiesF27+b7p0f5czSsX/Yyab5ChYAXj0YPRrywkpvkAxsgBkh/SFKrbPDXyZzn+s/eaAxx0Bv1A05XGx2rqt2Y/Yu95GJUBsu8g3/RJTQsIqnxLAisWlmkAjJsGtEDs8QsWv22hnVTTnJQBM3oVKLU91Q1bpE7GZeejOkD2HuQ7WibpROJ8YorR28aabGOgCSXa990UlhHjDm5oPYsUg/VdFqnfXwGaF69q+OVoOWeMtN4FESACAOP25izlMoDEN8onbARBxiZCMkAH5iZCkc6Mxg4bpOTIxNwud9h12t1OMGJjuHStWX0/SePIqduCCZA0qoNEd+o8AIucptUfsnKdiq7Oy8U1p5jPzmK1joCFktgYmUC3U4DCPZMb/pXT3emBzgouQNKYT+mOfjSpqe0gfFPSOmgAbuUBLZqYFn3L8T4G0+UvY2JBYCflGxHAZk3nOZtrGn/n+PjzxGHBBkh6fYLdraeRbhBxy6LcfweEFievQA1yPjLeM74sZ5/R/zJxXWJq+IFCOGf4Z5BMu2hQBfdiYkF0h6Mymdv5fyE1wKC6bA63xreergqdEFn0rrsAaueS5CqrMgF2MMmHNgX/DTJ0kQTRHfrU2QQIOn5TIo+WF9nG9aggfSgp3TWXGEKO7CDLfZppwLgjoGr1brOkmBlqLm38ADkA2pWb2o7Qk7qoibhaEgGaUAy+XQkokREPvnspXHm5JDkyMftfs0Kz3a5ezOWmt9KXHyAjoFXZ0XayTrwK4EoroFqw3clAG0q0Nfv/pDGIHRTjnFFmwZ8V038w84JEKHJPoZ8z/DOIlW2zv22KhJkIKxg4JhtXw7fddyiu7Gk/XNf0NjCuskENlHl4RvUkLT14ILni4WlRIU3mf0ZAwP8GMbk9UvqM14MhiO4ONdnMmplgKyccJ/H88xNmbVGiJvqqtYEVrrUfIBbXXhA0oyjQRODvSiK6szgiU+ZPs06zEzXhJ01Z+0Z7EfADxOZmqNzQfoJBJCGPetPmyN7X7DVmXhh8Sv9pNBoVFwP+xyICfoBYBGx/82BnLKQAqyQS3dkZ4R4Ay4tozA1usjHaGbjX2vgB4sCKDKHlFER34x1wmY2Le0ijhb3nh/+ejRO/7SACfoA4uBME0V1RYCAM0CxpRHfDj/dZZppTCEwsDi5ZRld+gGSEyLqBoOxUdfG4Rxdab225xRsE1Jc9qd3hnzMsY5exgR8gGSGyb1DRFatghkiElEHG1s/Mqwb6S9p/deHCnfZH6bccCQE/QCTvD0F0t23cS1cxIIjuDneouweVgFbXMzn6skP+fDfDIOAHSI62RvWG6Lg+Ra3PkqjtOWbMSVRHEjkadsF34wdIjrdAWVfsKAV8AzFdaqHrrSAOT9h+/O35ysllYa6eMvUDxKXlSJG4ifPJqSMMYYCZ1wQCxa2bpiza7tJQC7pbP0BcXH6D6G5S4ArS0bifypROjAeTKuq9zLvlInQ569oPkJxBPUJHzFS2IXaSEqDPKIT3BpLq70YrEZsX4LYyBj9ArKDl2xYcAn6AFNyS+xO2goAfIFbQ8m0LDgE/QApuyf0JW0HADxAraPm2BYeAHyAFt+T+hK0g4AeIFbR824JDwA+Qgltyf8JWEPADxApavm3BIeAHSMEtuT9hKwj4AWIFLd+24BD4f2wScLlWlEBxAAAAAElFTkSuQmCC"
              id="icon"
              width="229.5"
              height="229.5"
              x="397.25"
              y="0"
              transform="translate(0 200.60808) "
            />
            <g
              id="title"
              style="
                font-style: normal;
                font-weight: 500;
                font-size: 72px;
                line-height: 1;
                font-family: 'Raleway Medium Alt1';
                font-variant-ligatures: none;
                text-align: center;
                text-anchor: middle;
              "
              aria-label="VUE-STACK"
            >
              <path
                id="path282489"
                style="
                  font-style: normal;
                  font-weight: 500;
                  font-size: 72px;
                  line-height: 1;
                  font-family: 'Raleway Medium Alt1';
                  font-variant-ligatures: none;
                  text-align: center;
                  text-anchor: middle;
                  fill: rgb(65, 184, 131);
                "
                d="m 310.85281,-51.12 17.136,41.976 3.24,-7.416 -13.536,-34.56 z m 40.608,0 -16.848,42.984 -3.168,7.416 0.36,0.72 h 5.616 l 20.88,-51.12 z"
                transform="translate(0 464.77288) translate(56.45899809999986 -14.051199999999987) scale(2.26) translate(-310.85281 51.12)"
              />
              <path
                id="path282491"
                style="
                  font-style: normal;
                  font-weight: 500;
                  font-size: 72px;
                  line-height: 1;
                  font-family: 'Raleway Medium Alt1';
                  font-variant-ligatures: none;
                  text-align: center;
                  text-anchor: middle;
                  fill: rgb(65, 184, 131);
                "
                d="m 374.19031,-11.592 c -1.152,-1.8 -2.016,-3.888 -2.52,-6.264 -0.504,-2.376 -0.72,-4.824 -0.72,-7.416 V -51.12 h -6.48 v 25.848 c 0,3.312 0.36,6.48 1.08,9.576 0.72,3.096 1.944,5.832 3.672,8.208 1.728,2.376 3.96,4.32 6.768,5.688 1.944,1.08 4.32,1.728 6.984,2.016 v -5.904 c -1.584,-0.288 -2.952,-0.792 -4.104,-1.44 -1.944,-1.152 -3.528,-2.592 -4.68,-4.464 z m 27.36,-39.528 v 25.848 c 0,2.52 -0.288,4.896 -0.72,7.272 -0.504,2.376 -1.368,4.464 -2.52,6.336 -1.152,1.872 -2.736,3.312 -4.68,4.464 -1.152,0.72 -2.52,1.152 -4.032,1.44 v 5.976 c 2.52,-0.288 4.752,-0.936 6.696,-1.872 2.736,-1.368 5.04,-3.24 6.768,-5.616 1.728,-2.304 2.952,-5.04 3.744,-8.136 0.792,-3.096 1.224,-6.408 1.224,-9.864 V -51.12 Z"
                transform="translate(0 464.77288) translate(177.63454809999993 -14.051199999999987) scale(2.26) translate(-364.47031 51.12)"
              />
              <path
                id="path282493"
                style="
                  font-style: normal;
                  font-weight: 500;
                  font-size: 72px;
                  line-height: 1;
                  font-family: 'Raleway Medium Alt1';
                  font-variant-ligatures: none;
                  text-align: center;
                  text-anchor: middle;
                  fill: rgb(65, 184, 131);
                "
                d="m 426.09219,-45.36 h 27.576 v -5.76 h -34.056 v 15.84 h 6.48 z m -6.48,39.6 V 0 h 34.704 v -5.76 z m 6.48,-17.64 h 23.976 v -5.4 h -30.456 v 16.56 h 6.48 z"
                transform="translate(0 464.77288) translate(302.25519689999993 -14.051199999999987) scale(2.26) translate(-419.61219 51.12)"
              />
              <path
                id="path282495"
                style="
                  font-style: normal;
                  font-weight: 500;
                  font-size: 72px;
                  line-height: 1;
                  font-family: 'Raleway Medium Alt1';
                  font-variant-ligatures: none;
                  text-align: center;
                  text-anchor: middle;
                  fill: rgb(65, 184, 131);
                "
                d="m 461.69394,-16.776 h 21.24 v -5.76 h -21.24 z"
                transform="translate(0 464.77288) translate(397.3599518999999 50.54864) scale(2.26) translate(-461.69394 22.536)"
              />
              <path
                id="path282497"
                style="
                  font-style: normal;
                  font-weight: 500;
                  font-size: 72px;
                  line-height: 1;
                  font-family: 'Raleway Medium Alt1';
                  font-variant-ligatures: none;
                  text-align: center;
                  text-anchor: middle;
                  fill: rgb(65, 184, 131);
                "
                d="m 523.74556,-40.392 3.024,-5.256 c -2.16,-1.728 -4.68,-3.168 -7.416,-4.248 -2.808,-1.008 -5.904,-1.584 -9.36,-1.584 -2.664,0 -5.112,0.36 -7.344,1.008 -2.304,0.648 -4.248,1.584 -5.832,2.88 -1.656,1.296 -2.952,2.88 -3.816,4.752 -0.936,1.872 -1.368,4.032 -1.368,6.48 0,2.016 0.288,3.744 1.008,5.184 0.648,1.44 1.656,2.664 2.952,3.672 1.296,1.008 2.952,1.872 4.968,2.592 1.944,0.72 4.248,1.44 6.84,2.016 2.304,0.576 4.392,1.152 6.264,1.728 1.872,0.576 3.384,1.152 4.68,1.872 1.224,0.72 2.16,1.584 2.808,2.592 0.648,1.008 1.008,2.16 1.008,3.6 0,2.592 -1.008,4.536 -3.024,5.832 -2.016,1.296 -4.896,1.944 -8.496,1.944 -2.016,0 -3.888,-0.144 -5.688,-0.576 -1.8,-0.432 -3.456,-0.936 -5.04,-1.584 -1.584,-0.648 -2.952,-1.368 -4.176,-2.232 -1.224,-0.792 -2.232,-1.584 -2.952,-2.448 l -3.096,5.472 c 2.88,2.376 6.048,4.176 9.576,5.4 3.528,1.224 7.272,1.8 11.232,1.8 2.592,0 5.04,-0.216 7.344,-0.792 2.232,-0.576 4.176,-1.44 5.832,-2.592 1.656,-1.152 2.952,-2.664 3.96,-4.464 0.936,-1.8 1.44,-3.96 1.44,-6.408 0,-2.304 -0.432,-4.248 -1.224,-5.832 -0.792,-1.584 -1.944,-2.88 -3.456,-4.032 -1.512,-1.08 -3.312,-2.016 -5.472,-2.736 -2.16,-0.72 -4.536,-1.44 -7.128,-2.016 -2.304,-0.504 -4.32,-1.008 -5.976,-1.512 -1.728,-0.432 -3.096,-1.008 -4.248,-1.656 -1.152,-0.648 -1.944,-1.44 -2.448,-2.376 -0.576,-0.864 -0.792,-2.016 -0.792,-3.456 0,-2.592 0.864,-4.608 2.736,-6.12 1.872,-1.44 4.752,-2.232 8.784,-2.232 1.512,0 2.952,0.216 4.392,0.504 1.44,0.288 2.736,0.72 3.96,1.224 1.152,0.504 2.232,1.08 3.24,1.656 0.936,0.648 1.728,1.296 2.304,1.944 z"
                transform="translate(0 464.77288) translate(460.6300530999998 -14.864799999999981) scale(2.26) translate(-489.68956 51.48)"
              />
              <path
                id="path282499"
                style="
                  font-style: normal;
                  font-weight: 500;
                  font-size: 72px;
                  line-height: 1;
                  font-family: 'Raleway Medium Alt1';
                  font-variant-ligatures: none;
                  text-align: center;
                  text-anchor: middle;
                  fill: rgb(65, 184, 131);
                "
                d="m 550.34056,0 h 6.48 v -38.88 h -6.48 z m -17.64,-51.12 v 5.76 h 41.76 v -5.76 z"
                transform="translate(0 464.77288) translate(557.8349131 -14.051199999999987) scale(2.26) translate(-532.70056 51.12)"
              />
              <path
                id="path282501"
                style="
                  font-style: normal;
                  font-weight: 500;
                  font-size: 72px;
                  line-height: 1;
                  font-family: 'Raleway Medium Alt1';
                  font-variant-ligatures: none;
                  text-align: center;
                  text-anchor: middle;
                  fill: rgb(65, 184, 131);
                "
                d="m 600.80356,-44.136 -2.808,7.632 6.48,16.488 h -12.816 l -1.944,5.04 h 16.2 L 611.96356,0 h 6.912 z m -2.808,-6.984 h -5.472 L 571.57156,0 h 6.624 l 17.064,-43.632 z"
                transform="translate(0 464.77288) translate(645.6833731 -14.051199999999987) scale(2.26) translate(-571.57156 51.12)"
              />
              <path
                id="path282503"
                style="
                  font-style: normal;
                  font-weight: 500;
                  font-size: 72px;
                  line-height: 1;
                  font-family: 'Raleway Medium Alt1';
                  font-variant-ligatures: none;
                  text-align: center;
                  text-anchor: middle;
                  fill: rgb(65, 184, 131);
                "
                d="m 628.26031,-32.76 c 0.72,-2.376 1.872,-4.536 3.384,-6.408 1.44,-1.872 3.312,-3.456 5.472,-4.608 2.16,-1.152 4.68,-1.8 7.56,-1.8 1.296,0 2.592,0.144 3.96,0.432 1.296,0.288 2.592,0.792 3.888,1.44 1.224,0.72 2.448,1.584 3.528,2.664 1.08,1.152 2.016,2.52 2.808,4.104 l 5.112,-3.312 c -1.584,-3.312 -4.032,-5.976 -7.272,-8.064 -3.312,-2.016 -7.2,-3.096 -11.736,-3.096 -3.888,0 -7.272,0.792 -10.296,2.232 -3.096,1.512 -5.616,3.456 -7.704,5.904 -2.088,2.448 -3.672,5.184 -4.752,8.208 -0.792,2.16 -1.224,4.32 -1.44,6.408 h 6.552 c 0.216,-1.368 0.504,-2.736 0.936,-4.104 z m 31.248,18.36 c -0.72,1.584 -1.656,2.952 -2.808,4.104 -1.152,1.152 -2.376,2.088 -3.6,2.808 -1.368,0.72 -2.664,1.296 -4.104,1.584 -1.44,0.36 -2.808,0.504 -4.104,0.504 -2.592,0 -4.896,-0.504 -7.056,-1.656 -2.16,-1.08 -4.032,-2.592 -5.616,-4.464 -1.656,-1.872 -2.88,-3.96 -3.744,-6.408 -0.576,-1.512 -0.936,-3.024 -1.152,-4.68 h -6.552 c 0.288,2.16 0.792,4.248 1.584,6.336 1.152,3.168 2.808,5.976 4.968,8.424 2.16,2.448 4.68,4.464 7.632,5.976 2.88,1.584 6.12,2.304 9.648,2.304 1.944,0 3.96,-0.216 6.048,-0.792 2.016,-0.504 3.96,-1.224 5.832,-2.304 1.872,-0.936 3.528,-2.232 4.968,-3.672 1.44,-1.44 2.592,-3.168 3.456,-5.112 z"
                transform="translate(0 464.77288) translate(756.8770681 -14.702079999999988) scale(2.26) translate(-620.77231 51.408)"
              />
              <path
                id="path282505"
                style="
                  font-style: normal;
                  font-weight: 500;
                  font-size: 72px;
                  line-height: 1;
                  font-family: 'Raleway Medium Alt1';
                  font-variant-ligatures: none;
                  text-align: center;
                  text-anchor: middle;
                  fill: rgb(65, 184, 131);
                "
                d="m 679.49844,-51.048 h -6.48 v 26.784 l 6.48,-6.984 z m 12.816,22.464 20.52,-22.536 h -6.984 l -26.352,28.296 -6.48,6.912 V 0 h 6.48 v -15.624 l 8.856,-9.216 18.576,24.84 h 7.056 z"
                transform="translate(0 464.77288) translate(874.9533219000002 -14.051199999999987) scale(2.26) translate(-673.01844 51.12)"
              />
            </g>
            <g
              id="tagline"
              style="
                font-style: oblique;
                font-weight: 600;
                font-size: 32px;
                line-height: 1;
                font-family: Raleway;
                font-variant-ligatures: none;
                text-align: center;
                text-anchor: middle;
              "
            />
          </g>
        </svg>
      </div>
    </div>
    <div class="content">
      <!-- <p class="explain">{{ $t('explain') }}</p> -->
      <p class="version">v1.0.0</p>
    </div>
    <div class="form">
      <van-button type="primary" @click="onExperience" block>开始体验</van-button>
      <!-- <cube-button @click="onExperience">开始体验</cube-button> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const onExperience = () => {
  router.push('/home/0');
};
</script>

<style lang="scss">
.index {
  height: 100%;
  .desc {
    position: relative;
    margin: 10px;
    .logo {
      display: flex;
      justify-content: center;
      svg {
        width: 80vw;
        height: 60vw;
      }
    }
  }
  .content {
    position: absolute;
    top: 50vw;
    width: 100%;
    color: #8799a3;
    font-size: 18px;
    .explain {
      width: 100%;
      padding: 0 15px;
      text-align: center;
      font-size: 14px;
      line-height: 2;
    }
    .version {
      margin-top: 15px;
      text-align: center;
    }
  }
  .form {
    margin: 10px;
    padding-top: 80px;
  }
  .change-language {
    padding: 10px;
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    .language-title {
      margin-bottom: 10px;
    }
  }
}
</style>
